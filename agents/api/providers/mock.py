def health():
    return True


def run(message: str):
    return {
        "provider": "mock",
        "response": f"Mock provider handled: {message}"
    }
