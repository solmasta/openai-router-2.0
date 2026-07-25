from .registry import get_providers

def get_agent_status():
    return {
        "online": True,
        "agent": "assistant"
    }

def list_agent_providers():
    return get_providers()
