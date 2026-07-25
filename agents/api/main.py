from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse, parse_qs
from .actions import get_state, set_provider, set_mode
from .router_bridge import get_route
from .pipeline import execute_request

class RouterHandler(BaseHTTPRequestHandler):

    def send_json(self, data):
        body = json.dumps(data).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlparse(self.path).path
        query = parse_qs(urlparse(self.path).query)

        if path == "/status":
            self.send_json({
                "online": True,
                "service": "openai-router-agent",
                **get_state()
            })

        elif path == "/providers":
            self.send_json([
                {
                    "id": "local",
                    "name": "Local Provider",
                    "status": "online"
                }
            ])

        elif path == "/agent":
            self.send_json({
                "online": True,
                "agent": "assistant"
            })

        elif path == "/route":
            self.send_json(get_route())

        elif path == "/execute":
            self.send_json(
                execute_request({
                    "input": query.get("input", [""])[0]
                })
            )

        elif path == "/set-provider":
            provider = query.get("name", ["local"])[0]
            self.send_json(set_provider(provider))

        elif path == "/set-mode":
            mode = query.get("mode", ["automatic"])[0]
            self.send_json(set_mode(mode))

        else:
            self.send_json({"error": "not found"})


if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8000), RouterHandler)
    print("OpenAI Router Agent running on :8000")
    server.serve_forever()
