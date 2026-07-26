import json
from pathlib import Path
from datetime import datetime


FILE = Path(
    "agents/data/live_events.json"
)


def publish(event, payload):

    events=[]

    if FILE.exists():
        events=json.loads(
            FILE.read_text()
        )

    events.append(
        {
            "time":
            datetime.utcnow().isoformat(),

            "event": event,

            "payload": payload
        }
    )

    FILE.write_text(
        json.dumps(
            events[-200:],
            indent=2
        )
    )


def get_events():

    if not FILE.exists():
        return []

    return json.loads(
        FILE.read_text()
    )
