import os
import httpx


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
        response = httpx.post(
            "https://api.openai.com/v1/responses",
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-5-mini",
                "input": message
            },
            timeout=30
        )

        data = response.json()

        if "output" in data:
            text = data["output"][0]["content"][0]["text"]
        else:
            text = str(data)

        return {
            "provider": "openai",
            "success": True,
            "response": text
        }

    except Exception as e:
        return {
            "provider": "openai",
            "success": False,
            "response": str(e)
        }
