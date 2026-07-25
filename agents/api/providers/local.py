def health():
    return True


def run(message: str):
    return {
        "provider": "local",
        "response": f"Local provider handled: {message}"
    }
