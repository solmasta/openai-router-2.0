#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router v2.1 Realtime Layer"
echo "======================================"

mkdir -p agents/api


echo "[1] Creating realtime event manager"


cat > agents/api/realtime.py <<'PY'
import json
from pathlib import Path
from datetime import datetime


FILE = Path(
    "agents/data/live_events.json"
)


def publish(event, payload):

    events=[]

    if FILE.exists():
        events=json.loads(
            FILE.read_text()
        )

    events.append(
        {
            "time":
            datetime.utcnow().isoformat(),

            "event": event,

            "payload": payload
        }
    )

    FILE.write_text(
        json.dumps(
            events[-200:],
            indent=2
        )
    )


def get_events():

    if not FILE.exists():
        return []

    return json.loads(
        FILE.read_text()
    )
PY



echo "[2] Creating realtime endpoint"


python - <<'PY'
from pathlib import Path

p=Path("agents/api/main.py")

s=p.read_text()

if "realtime import" not in s:
    s=s.replace(
        "from http.server import HTTPServer",
        "from http.server import HTTPServer\nfrom agents.api.realtime import get_events"
    )

if '"/live-events"' not in s:
    s=s.replace(
        'elif self.path == "/events":',
        'elif self.path == "/live-events":\n            self.send_json(get_events())\n\n        elif self.path == "/events":'
    )

p.write_text(s)
PY



echo "[3] Creating dashboard realtime API"


cat > apps/web/src/api/live.ts <<'TS'
const API =
 import.meta.env.VITE_ROUTER_API_URL ||
 "http://127.0.0.1:8000"


export async function getLiveEvents(){

 const r =
 await fetch(
  `${API}/live-events`
 )

 return r.json()

}
TS



echo "[4] Build check"

pnpm --filter web build



echo "[5] Save"

git add .

git commit -m "Add realtime event layer foundation" || true

git push origin main || true


echo "======================================"
echo " REALTIME FOUNDATION COMPLETE"
echo "======================================"

