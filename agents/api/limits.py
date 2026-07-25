import json
from pathlib import Path
from datetime import datetime

LIMIT_FILE = Path("agents/data/limits.json")


DEFAULT_LIMIT = 100


def load():
    if not LIMIT_FILE.exists():
        return {}
    return json.loads(
        LIMIT_FILE.read_text()
    )


def save(data):
    LIMIT_FILE.write_text(
        json.dumps(data, indent=2)
    )


def check_limit(user):

    limits = load()

    if user not in limits:
        limits[user] = {
            "requests": 0,
            "limit": DEFAULT_LIMIT,
            "reset": datetime.utcnow().isoformat()
        }

        save(limits)

    if limits[user]["requests"] >= limits[user]["limit"]:
        return False

    limits[user]["requests"] += 1
    save(limits)

    return True


def usage():
    return load()


def set_limit(user, amount):

    limits = load()

    if user not in limits:
        limits[user] = {
            "requests": 0,
            "reset": datetime.utcnow().isoformat()
        }

    limits[user]["limit"] = amount

    save(limits)
