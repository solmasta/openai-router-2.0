import json
import secrets
from pathlib import Path

KEY_FILE = Path("agents/data/api_keys.json")


def load():
    if not KEY_FILE.exists():
        return {}
    return json.loads(KEY_FILE.read_text())


def save(data):
    KEY_FILE.write_text(
        json.dumps(data, indent=2)
    )


def create_key(name):
    keys = load()

    token = secrets.token_hex(32)

    keys[name] = {
        "key": token,
        "requests": 0
    }

    save(keys)

    return token


def verify_key(token):
    keys = load()

    for user, data in keys.items():
        if data["key"] == token:
            data["requests"] += 1
            save(keys)
            return True

    return False


def list_keys():
    return load()


def remove_key(name):
    keys = load()

    if name in keys:
        del keys[name]

    save(keys)
