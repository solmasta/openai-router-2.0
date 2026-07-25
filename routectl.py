#!/usr/bin/env python3

import json
import sys
from pathlib import Path

FILE = Path("config/routes.json")


def load():
    return json.loads(FILE.read_text())


def save(data):
    FILE.write_text(
        json.dumps(data, indent=2)
    )


if len(sys.argv) < 2:
    print("""
routes commands:

routes list
routes add NAME
routes remove NAME
""")
    exit()


cmd = sys.argv[1]

data = load()


if cmd == "list":
    print(json.dumps(data, indent=2))


elif cmd == "add":

    name = sys.argv[2]

    if name not in data["rules"]:
        data["rules"][name] = [
            "local",
            "openai"
        ]

    save(data)

    print("Route added:", name)


elif cmd == "remove":

    name = sys.argv[2]

    if name in data["rules"]:
        del data["rules"][name]

    save(data)

    print("Route removed:", name)
