import json
from pathlib import Path
from datetime import datetime


FILE = Path("agents/data/provider_intelligence.json")


def load():

    if not FILE.exists():
        return {}

    return json.loads(FILE.read_text())


def save(data):

    FILE.write_text(
        json.dumps(data, indent=2)
    )


def update(provider, success, latency):

    data = load()

    if provider not in data:
        data[provider] = {
            "requests": 0,
            "success": 0,
            "failure": 0,
            "latency": 0,
            "score": 0
        }


    item = data[provider]

    item["requests"] += 1

    if success:
        item["success"] += 1
    else:
        item["failure"] += 1


    item["latency"] = latency


    item["score"] = (
        item["success"]
        -
        item["failure"]
    )


    item["updated"] = datetime.utcnow().isoformat()

    save(data)

    return item



def get():

    return load()
