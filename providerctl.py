#!/usr/bin/env python3

import json
import sys
from pathlib import Path

FILE = Path("config/providers.json")


DEFAULT = {
    "local": {
        "enabled": True,
        "priority": 1
    },
    "mock": {
        "enabled": True,
        "priority": 2
    },
    "openai": {
        "enabled": True,
        "priority": 3
    }
}


def load():
    if not FILE.exists():
        FILE.parent.mkdir(exist_ok=True)
        save(DEFAULT)

    return json.loads(FILE.read_text())


def save(data):
    FILE.write_text(
        json.dumps(data, indent=2)
    )


if len(sys.argv) < 2:
    print("""
providers commands:

providers list
providers enable NAME
providers disable NAME
providers health
""")
    exit()


cmd = sys.argv[1]

providers = load()


if cmd == "list":
    print(json.dumps(providers, indent=2))


elif cmd == "enable":

    name = sys.argv[2]

    if name in providers:
        providers[name]["enabled"] = True
        save(providers)
        print(name, "enabled")


elif cmd == "disable":

    name = sys.argv[2]

    if name in providers:
        providers[name]["enabled"] = False
        save(providers)
        print(name, "disabled")


elif cmd == "health":

    for name, info in providers.items():
        status = "online" if info["enabled"] else "disabled"
        print(f"{name}: {status}")
