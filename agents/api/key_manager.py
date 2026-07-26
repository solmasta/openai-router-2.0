import json
import secrets
from pathlib import Path


FILE = Path(
    "config/api_keys.json"
)


def load():

    if not FILE.exists():
        FILE.write_text("{}")

    return json.loads(
        FILE.read_text()
    )


def save(data):

    FILE.write_text(
        json.dumps(
            data,
            indent=2
        )
    )


def create(user):

    keys = load()

    token = secrets.token_hex(32)

    keys[token] = {
        "user": user,
        "active": True
    }

    save(keys)

    return token



def verify(token):

    keys = load()

    return keys.get(
        token,
        {}
    ).get(
        "active",
        False
    )


def list_keys():

    return load()
