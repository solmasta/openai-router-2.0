from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from agents.api.session import login, verify_token
from agents.api.auth import verify_key
from agents.api.router_bridge import execute_router, router_info
from agents.api.history import save_execution, get_history
from agents.api.metrics import record_request, get_metrics


from agents.router.client import execute_route


def execute_request(payload):
    message = payload.get("message", "")
    provider = payload.get("provider")

    result = execute_router(
        message,
        provider
    )

    save_execution(
        message,
        result.get("provider"),
        result.get("response")
    )

    record_request(
        result.get("provider")
    )

    return result


class RouterHandler(BaseHTTPRequestHandler):

    def check_auth(self):
        if not verify_token(self.headers):
            self.send_json({
                "error": "unauthorized"
            })
            return False

        return True


    def send_json(self, data):
        body = json.dumps(data).encode()

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/status":
            self.send_json({
                "online": True,
                "service": "openai-router-agent"
            })

        elif self.path == "/providers":
            self.send_json([
                {
                    "id": "local",
                    "name": "Local Provider",
                    "status": "online"
                }
            ])


        elif self.path == "/history":
            self.send_json(
                get_history()
            )

        elif self.path == "/router":
            self.send_json(
                router_info()
            )

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

    def do_POST(self):

        if not self.check_auth():
            return

        if self.path != "/execute":
            self.send_json({
                "error": "not found"
            })
            return

        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)

        try:
            payload = json.loads(body.decode())
            self.send_json(execute_request(payload))
        except Exception as e:
            self.send_json({
                "success": False,
                "error": str(e)
            })


if __name__ == "__main__":
    server = HTTPServer(
        ("127.0.0.1", 8000),
        RouterHandler
    )

    print("OpenAI Router Agent running on :8000")
    server.serve_forever()
