#!/usr/bin/env python3

import json
import sys
from pathlib import Path

CONFIG = Path("config/router.json")

def load():
    return json.loads(CONFIG.read_text())

def save(data):
    CONFIG.write_text(json.dumps(data, indent=2))

config = load()

if len(sys.argv) < 3:
    print("""
Usage:

providerctl list
providerctl enable <name>
providerctl disable <name>
providerctl model <name> <model>
""")
    exit()

cmd = sys.argv[1]

if cmd == "list":
    for name, data in config["providers"].items():
        print(
            name,
            "enabled=" + str(data.get("enabled"))
        )

elif cmd == "enable":
    name = sys.argv[2]
    config["providers"][name]["enabled"] = True
    save(config)
    print(name, "enabled")

elif cmd == "disable":
    name = sys.argv[2]
    config["providers"][name]["enabled"] = False
    save(config)
    print(name, "disabled")

elif cmd == "model":
    name = sys.argv[2]
    model = sys.argv[3]
    config["providers"][name]["model"] = model
    save(config)
    print(name, "model set to", model)
