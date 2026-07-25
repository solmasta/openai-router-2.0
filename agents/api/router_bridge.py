import json
import subprocess
from pathlib import Path


def execute_router(message: str):
    """
    Bridge placeholder for router execution.

    Keeps the agent API independent while
    the TypeScript router remains the source
    of routing logic.
    """

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
            f"{provider} provider received: {message}"
    }
