#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Core Upgrade"
echo "======================================"


mkdir -p agents/data


echo "[1] Provider intelligence database"


cat > agents/api/provider_intelligence.py <<'PY'
import json
from pathlib import Path
from datetime import datetime


FILE = Path("agents/data/provider_intelligence.json")


def load():

    if not FILE.exists():
        return {}

    return json.loads(FILE.read_text())


def save(data):

    FILE.write_text(
        json.dumps(data, indent=2)
    )


def update(provider, success, latency):

    data = load()

    if provider not in data:
        data[provider] = {
            "requests": 0,
            "success": 0,
            "failure": 0,
            "latency": 0,
            "score": 0
        }


    item = data[provider]

    item["requests"] += 1

    if success:
        item["success"] += 1
    else:
        item["failure"] += 1


    item["latency"] = latency


    item["score"] = (
        item["success"]
        -
        item["failure"]
    )


    item["updated"] = datetime.utcnow().isoformat()

    save(data)

    return item



def get():

    return load()
PY


echo "[2] Smart routing engine"


cat > agents/api/smart_router.py <<'PY'
import time

from agents.api.provider_registry import (
    get_provider
)

from agents.api.provider_intelligence import (
    update,
    get
)


ORDER = [
    "openai",
    "mock",
    "local"
]


def best_provider():

    stats = get()

    winner = "local"
    score = -999


    for provider in ORDER:

        current = stats.get(
            provider,
            {}
        )


        value = current.get(
            "score",
            0
        )


        if value > score:

            score = value
            winner = provider


    return winner



def execute(message):

    provider = best_provider()

    start = time.time()

    try:

        result = get_provider(
            provider
        )(message)


        update(
            provider,
            True,
            time.time()-start
        )


        return {
            **result,
            "route": "automatic",
            "selected_provider": provider
        }


    except Exception as e:


        update(
            provider,
            False,
            time.time()-start
        )


        return {
            "success": False,
            "provider": provider,
            "error": str(e)
        }
PY


echo "[3] Add API endpoint"


python - <<'PY'

p="agents/api/main.py"

s=open(p).read()


if "provider_intelligence" not in s:

    s=s.replace(
"from agents.api.history import save_execution, get_history",
"from agents.api.history import save_execution, get_history\nfrom agents.api.provider_intelligence import get as provider_intelligence"
    )


s=s.replace(
'elif self.path == "/router":',
'elif self.path == "/intelligence":\n            self.send_json(provider_intelligence())\n\n        elif self.path == "/router":'
)


open(p,"w").write(s)

PY


echo "[4] Create dashboard API"


cat > apps/web/src/api/intelligence.ts <<'TS'
const API =
 import.meta.env.VITE_ROUTER_API_URL ||
 "http://127.0.0.1:8000"


export async function getIntelligence(){

 const response =
 await fetch(
  `${API}/intelligence`
 )

 return response.json()

}
TS


echo "[5] Build check"

pnpm --filter web build


echo "[6] Commit"

git add .

git commit -m "Add intelligent routing core" || true

git push origin main || true


echo "======================================"
echo " ROUTER CORE COMPLETE"
echo " Restart:"
echo "./router restart"
echo "======================================"

