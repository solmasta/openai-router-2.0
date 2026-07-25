import json
from pathlib import Path

STATE_FILE = Path("agents/router-state.json")

DEFAULT_STATE = {
    "activeProvider": "local",
    "mode": "automatic",
}

def load_state():
    if not STATE_FILE.exists():
        save_state(DEFAULT_STATE)
        return DEFAULT_STATE.copy()

    return json.loads(STATE_FILE.read_text())

def save_state(state):
    STATE_FILE.write_text(
        json.dumps(state, indent=2)
    )
