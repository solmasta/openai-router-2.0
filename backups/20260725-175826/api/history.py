import json
from pathlib import Path
from datetime import datetime


HISTORY_FILE = Path(
    "agents/data/history.json"
)


def load_history():
    if not HISTORY_FILE.exists():
        return []

    return json.loads(
        HISTORY_FILE.read_text()
    )


def save_execution(
    message,
    provider,
    response
):
    history = load_history()

    history.append({
        "time": datetime.utcnow().isoformat(),
        "message": message,
        "provider": provider,
        "response": response
    })

    HISTORY_FILE.write_text(
        json.dumps(
            history,
            indent=2
        )
    )

    return history[-1]


def get_history():
    return load_history()
