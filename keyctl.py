#!/usr/bin/env python3

import sys
from agents.api.keys import (
    create_key,
    list_keys,
    remove_key
)

if len(sys.argv) < 2:
    print("""
keyctl list
keyctl create NAME
keyctl remove NAME
""")
    exit()

cmd=sys.argv[1]

if cmd=="list":
    print(list_keys())

elif cmd=="create":
    print(
        create_key(sys.argv[2])
    )

elif cmd=="remove":
    remove_key(sys.argv[2])
    print("removed")
