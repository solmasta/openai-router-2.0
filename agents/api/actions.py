router_state = {
    "activeProvider": "local",
    "mode": "automatic",
}

def set_provider(provider: str):
    router_state["activeProvider"] = provider
    return router_state

def set_mode(mode: str):
    router_state["mode"] = mode
    return router_state
