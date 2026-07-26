#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Enterprise Layer"
echo "======================================"

mkdir -p config agents/api


echo "[1] Creating API key manager"


cat > agents/api/key_manager.py <<'PY'
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
PY



echo "[2] Creating provider policy system"


cat > config/provider_policy.json <<'JSON'
{
  "routing": {
    "strategy": "automatic",
    "fallback": true
  },

  "providers": {
    "openai": {
      "enabled": true,
      "priority": 3
    },

    "mock": {
      "enabled": true,
      "priority": 2
    },

    "local": {
      "enabled": true,
      "priority": 1
    }
  }
}
JSON



echo "[3] Creating event stream foundation"


cat > agents/api/events.py <<'PY'
import json
from pathlib import Path
from datetime import datetime


FILE = Path(
    "agents/data/events.json"
)


def emit(event, data):

    events=[]

    if FILE.exists():
        events=json.loads(
            FILE.read_text()
        )


    events.append(
        {
            "time":
            datetime.utcnow().isoformat(),

            "event":event,

            "data":data
        }
    )


    FILE.write_text(
        json.dumps(
            events[-500:],
            indent=2
        )
    )


def latest():

    if not FILE.exists():
        return []

    return json.loads(
        FILE.read_text()
    )[-50:]
PY



echo "[4] Add enterprise endpoint"


python - <<'PY'

from pathlib import Path

p=Path("agents/api/main.py")

s=p.read_text()


if "events import" not in s:

    s=s.replace(
"from agents.api.metrics import record_request, get_metrics",
"from agents.api.metrics import record_request, get_metrics\nfrom agents.api.events import latest"
    )


s=s.replace(
'elif self.path == "/metrics":',
'elif self.path == "/events":\n            self.send_json(latest())\n\n        elif self.path == "/metrics":'
)


p.write_text(s)

PY



echo "[5] Create admin UI API helper"


cat > apps/web/src/api/events.ts <<'TS'
const API =
 import.meta.env.VITE_ROUTER_API_URL ||
 "http://127.0.0.1:8000"


export async function getEvents(){

 const r =
 await fetch(
  `${API}/events`
 )

 return r.json()

}
TS



echo "[6] Build test"

pnpm --filter web build



echo "[7] Commit"

git add .

git commit -m "Add enterprise control layer foundation" || true

git push origin main || true


echo "======================================"
echo " ENTERPRISE LAYER COMPLETE"
echo
echo "Restart:"
echo "./router restart"
echo
echo "Test:"
echo "curl http://127.0.0.1:8000/events"
echo "======================================"

