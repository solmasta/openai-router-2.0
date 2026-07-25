from http.server import BaseHTTPRequestHandler, HTTPServer
import json

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


if __name__ == "__main__":
    server = HTTPServer(
        ("127.0.0.1", 8000),
        RouterHandler
    )

    print("OpenAI Router Agent running on :8000")
    server.serve_forever()
