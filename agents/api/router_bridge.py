import json
from pathlib import Path

ROUTER_STATE = Path("agents/router-state.json")

def get_router_state():
    if ROUTER_STATE.exists():
        return json.loads(ROUTER_STATE.read_text())

    return {
        "activeProvider": "local",
        "mode": "automatic",
    }


def get_route():
    state = get_router_state()

    return {
        "provider": state.get("activeProvider", "local"),
        "mode": state.get("mode", "automatic"),
        "decision": "primary",
    }
