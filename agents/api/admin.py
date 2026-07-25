import json
import os
import signal

from pathlib import Path


CONFIG = Path(
    "config/providers.json"
)


def load():

    if not CONFIG.exists():
        return {}

    return json.loads(
        CONFIG.read_text()
    )


def save(data):

    CONFIG.parent.mkdir(
        exist_ok=True
    )

    CONFIG.write_text(
        json.dumps(
            data,
            indent=2
        )
    )


def providers():

    return load()


def enable(name):

    data = load()

    if name in data:
        data[name]["enabled"] = True

    save(data)

    return data


def disable(name):

    data = load()

    if name in data:
        data[name]["enabled"] = False

    save(data)

    return data
