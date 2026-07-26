from http.server import BaseHTTPRequestHandler, HTTPServer
from agents.api.realtime import get_events
import json
import time
from agents.api.database.db import init_db
from agents.api.database.history_store import get_requests
from agents.api.session import login, verify_token
from agents.api.auth import verify_key
from agents.api.router_bridge import execute_router, router_info
from agents.api.provider_registry import list_providers
from agents.api.history import save_execution, get_history
from agents.api.database_api import list_requests
from agents.api.provider_intelligence import get as provider_intelligence
from agents.api.provider_intelligence import update as record_intelligence
from agents.api.metrics import record_request, get_metrics
from agents.api.events import latest
from agents.api.streaming import stream_text


from agents.router.client import execute_route


def execute_request(payload):
    message = payload.get("message", "")
    provider = payload.get("provider")

    start = time.monotonic()

    result = execute_router(
        message,
        provider
    )

    latency = time.monotonic() - start

    save_execution(
        message,
        result.get("provider"),
        result.get("response")
    )

    record_request(
        result.get("provider")
    )

    record_intelligence(
        result.get("provider"),
        result.get("success", True),
        latency
    )

    return result


class RouterHandler(BaseHTTPRequestHandler):

    def check_auth(self):
        if not verify_token(self.headers):
            self.send_json(
                {"error": "unauthorized"},
                status=401
            )
            return False

        return True


    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, X-API-Key"
        )


    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.send_header("Content-Length", "0")
        self.end_headers()


    def send_json(self, data, status=200):
        body = json.dumps(data).encode()

        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/status":
            self.send_json({
                "online": True,
                "service": "openai-router-agent"
            })

        elif self.path == "/providers":
            self.send_json(
                list_providers()
            )


        elif self.path == "/database-history":
            self.send_json(list_requests())

        elif self.path == "/history":
            self.send_json(
                get_history()
            )

        elif self.path == "/intelligence":
            self.send_json(provider_intelligence())

        elif self.path == "/router":
            self.send_json(
                router_info()
            )

        elif self.path == "/live-events":
            self.send_json(get_events())

        elif self.path == "/events":
            self.send_json(latest())

        elif self.path == "/metrics":

            if not self.check_auth():
                return

            self.send_json(
                get_metrics()
            )

        elif self.path == "/agent":
            self.send_json({
                "online": True,
                "agent": "assistant"
            })

        else:
            self.send_json({
                "error": "not found"
            })

    def do_stream(self, text):

        self.send_response(200)
        self.send_header(
            "Content-Type",
            "text/plain; charset=utf-8"
        )
        self.send_header(
            "Cache-Control",
            "no-cache"
        )
        self.send_cors_headers()
        self.end_headers()

        for chunk in stream_text(text):
            self.wfile.write(
                chunk.encode()
            )
            self.wfile.flush()



    def do_POST(self):

        if self.path == "/login":

            length = int(
                self.headers.get(
                    "Content-Length",
                    0
                )
            )

            body = self.rfile.read(length)

            payload = json.loads(
                body.decode()
            )

            token = login(
                payload.get("username"),
                payload.get("password")
            )

            if token:
                self.send_json({
                    "success": True,
                    "token": token
                })
            else:
                self.send_json({
                    "success": False,
                    "error": "invalid credentials"
                })

            return


        if not self.check_auth():
            return


        if self.path == "/execute/stream":

            length = int(
                self.headers.get(
                    "Content-Length",
                    0
                )
            )

            body = self.rfile.read(length)

            payload = json.loads(
                body.decode()
            )

            result = execute_request(payload)

            self.do_stream(
                result.get(
                    "response",
                    ""
                )
            )

            return


        if self.path != "/execute":
            self.send_json({
                "error": "not found"
            })
            return


        length = int(
            self.headers.get(
                "Content-Length",
                0
            )
        )

        body = self.rfile.read(length)

        try:
            payload = json.loads(
                body.decode()
            )

            self.send_json(
                execute_request(payload)
            )

        except Exception as e:
            self.send_json({
                "success": False,
                "error": str(e)
            })

if __name__ == "__main__":
    init_db()

    server = HTTPServer(
        ("127.0.0.1", 8000),
        RouterHandler
    )

    print("OpenAI Router Agent running on :8000")
    server.serve_forever()
