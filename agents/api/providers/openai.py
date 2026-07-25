import os


def run(message: str):

    key = os.getenv(
        "OPENAI_API_KEY"
    )

    if not key:
        return {
            "provider": "openai",
            "response": "OpenAI provider configured but API key missing"
        }

    return {
        "provider": "openai",
        "response": f"OpenAI provider placeholder received: {message}"
    }
