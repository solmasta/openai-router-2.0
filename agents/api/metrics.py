import json
from pathlib import Path
from datetime import datetime

METRICS_FILE = Path(
    "agents/data/metrics.json"
)

START_TIME = datetime.utcnow()


def load_metrics():

    if not METRICS_FILE.exists():
        return {
            "requests": 0,
            "providers": {},
            "last_request": None
        }

    return json.loads(
        METRICS_FILE.read_text()
    )


metrics = load_metrics()


def save_metrics():

    METRICS_FILE.parent.mkdir(
        exist_ok=True
    )

    METRICS_FILE.write_text(
        json.dumps(
            metrics,
            indent=2
        )
    )


def record_request(provider):

    metrics["requests"] += 1

    if provider not in metrics["providers"]:
        metrics["providers"][provider] = 0

    metrics["providers"][provider] += 1

    metrics["last_request"] = (
        datetime.utcnow().isoformat()
    )

    save_metrics()


def get_metrics():

    uptime = (
        datetime.utcnow() - START_TIME
    ).total_seconds()

    return {
        "requests": metrics["requests"],
        "providers": metrics["providers"],
        "last_request": metrics["last_request"],
        "uptime_seconds": uptime
    }
