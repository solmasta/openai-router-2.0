from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from agents.api.router_bridge import execute_router


from agents.router.client import execute_route


def execute_request(payload):
    message = payload.get("message", "")

    return execute_router(message)


class RouterHandler(BaseHTTPRequestHandler):

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
