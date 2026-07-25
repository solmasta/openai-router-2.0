from .state import load_state, save_state

router_state = load_state()

def get_state():
    return router_state

def set_provider(provider: str):
    router_state["activeProvider"] = provider
    save_state(router_state)
    return router_state

def set_mode(mode: str):
    router_state["mode"] = mode
    save_state(router_state)
    return router_state
