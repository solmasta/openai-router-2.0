#!/usr/bin/env python3

import json
import sys
from pathlib import Path

FILE = Path("config/router.json")


def load():
    return json.loads(FILE.read_text())


def save(data):
    FILE.write_text(
        json.dumps(data, indent=2)
    )


if len(sys.argv) < 2:
    print("""
config commands:

configctl show
configctl set KEY VALUE
configctl validate
""")
    exit()


cmd = sys.argv[1]


if cmd == "show":
    print(json.dumps(load(), indent=2))


elif cmd == "set":

    data = load()

    key = sys.argv[2]
    value = sys.argv[3]

    if value.lower() in ["true","false"]:
        value = value.lower() == "true"

    data[key] = value

    save(data)

    print("Updated:", key)


elif cmd == "validate":

    data = load()

    required = [
        "default_provider",
        "auto_routing"
    ]

    for item in required:
        if item not in data:
            print("Missing:", item)
            exit(1)

    print("Configuration OK")
