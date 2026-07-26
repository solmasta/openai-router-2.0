import json
import os
import urllib.error
import urllib.request


def health():
    return bool(
        os.getenv("OPENAI_API_KEY")
    )


def run(message: str):

    key = os.getenv(
        "OPENAI_API_KEY"
    )

    if not key:
        return {
            "provider": "openai",
            "success": False,
            "response":
                "OpenAI provider unavailable: missing OPENAI_API_KEY"
        }

    try:
        request = urllib.request.Request(
            "https://api.openai.com/v1/responses",
            data=json.dumps({
                "model": "gpt-5-mini",
                "input": message
            }).encode(),
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json"
            },
            method="POST"
        )

        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read())

        if "output" in data:
            text = data["output"][0]["content"][0]["text"]
        else:
            text = str(data)

        return {
            "provider": "openai",
            "success": True,
            "response": text
        }

    except urllib.error.HTTPError as e:
        return {
            "provider": "openai",
            "success": False,
            "response": f"{e.code} {e.reason}: {e.read().decode(errors='replace')}"
        }

    except Exception as e:
        return {
            "provider": "openai",
            "success": False,
            "response": str(e)
        }
