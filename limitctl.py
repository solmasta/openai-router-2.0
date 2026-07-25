#!/usr/bin/env python3

import sys
from agents.api.limits import (
    usage,
    set_limit
)

if len(sys.argv) < 2:
    print("""
limitctl usage
limitctl set USER NUMBER
""")
    exit()

if sys.argv[1] == "usage":
    print(usage())

elif sys.argv[1] == "set":
    set_limit(
        sys.argv[2],
        int(sys.argv[3])
    )
    print("limit updated")
