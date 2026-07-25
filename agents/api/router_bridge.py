import json
import subprocess


def execute_router(message: str):

    if "openai" in message.lower():
        provider = "openai"

    elif "mock" in message.lower():
        provider = "mock"

    else:
        provider = "local"


    return {
        "success": True,
        "provider": provider,
        "response":
            f"{provider} routed message: {message}"
    }


def router_info():

    return {
        "online": True,
        "providers": [
            "local",
            "mock",
            "openai"
        ]
    }
