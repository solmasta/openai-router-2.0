#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Fixing realtime import..."

python - <<'PY'
from pathlib import Path

p = Path("agents/api/main.py")

s = p.read_text()

if "from agents.api.realtime import get_events" not in s:
    s = s.replace(
        "from http.server import HTTPServer",
        "from http.server import HTTPServer\nfrom agents.api.realtime import get_events"
    )

p.write_text(s)

PY

echo "Checking syntax..."

python -m py_compile agents/api/main.py

echo "Restarting API..."

pkill -f "agents.api.main" || true

python -m agents.api.main &

sleep 2

echo "Testing..."

curl -s http://127.0.0.1:8000/live-events

echo

git add agents/api/main.py

git commit -m "Fix realtime event import" || true

git push origin main || true

echo "DONE"

