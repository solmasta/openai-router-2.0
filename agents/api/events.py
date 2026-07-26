import json
from pathlib import Path
from datetime import datetime


FILE = Path(
    "agents/data/events.json"
)


def emit(event, data):

    events=[]

    if FILE.exists():
        events=json.loads(
            FILE.read_text()
        )


    events.append(
        {
            "time":
            datetime.utcnow().isoformat(),

            "event":event,

            "data":data
        }
    )


    FILE.write_text(
        json.dumps(
            events[-500:],
            indent=2
        )
    )


def latest():

    if not FILE.exists():
        return []

    return json.loads(
        FILE.read_text()
    )[-50:]
