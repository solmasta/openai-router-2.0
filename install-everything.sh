#!/data/data/com.termux/files/usr/bin/bash

set -e

ROOT="$(pwd)"

echo "======================================"
echo " OpenAI Router 2.0 FULL STACK INSTALL"
echo "======================================"

echo "[1/10] Checking environment"

command -v python >/dev/null || {
 echo "Python missing"
 exit 1
}

command -v pnpm >/dev/null || {
 echo "pnpm missing"
 exit 1
}


echo "[2/10] Stopping old services"

pkill -f "agents.api.main" || true
pkill -f "vite" || true


echo "[3/10] Creating directories"

mkdir -p \
agents/data \
logs \
scripts \
config


echo "[4/10] Creating environment"

cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
VITE_ROUTER_API_KEY=dev-router-key
ENV


echo "[5/10] Installing packages"

pnpm install


echo "[6/10] Creating router manager"

cat > router <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"
LOG="$ROOT/logs/router.log"

start(){

echo "Starting API"

python -m agents.api.main >> "$LOG" 2>&1 &


sleep 2


echo "Starting dashboard"

pnpm --filter web dev >> "$LOG" 2>&1 &


echo "Router started"

}



stop(){

pkill -f "agents.api.main" || true
pkill -f "vite" || true

echo "Router stopped"

}



status(){

echo "--- API ---"

curl -s http://127.0.0.1:8000/status || echo offline


echo

echo "--- Router ---"

curl -s http://127.0.0.1:8000/router || true

}



doctor(){

echo "Checking system..."

python --version
node --version
pnpm --version


echo

echo "API:"

curl -s http://127.0.0.1:8000/status || true


echo

echo "Build:"

pnpm --filter web build

}



logs(){

tail -f "$LOG"

}



update(){

git pull origin main
pnpm install
pnpm --filter web build

}



case "$1" in

start)
start
;;

stop)
stop
;;

restart)
stop
sleep 2
start
;;

status)
status
;;

doctor)
doctor
;;

logs)
logs
;;

update)
update
;;

*)
echo "Commands:"
echo "router start"
echo "router stop"
echo "router restart"
echo "router status"
echo "router doctor"
echo "router logs"
echo "router update"
;;

esac
SCRIPT


chmod +x router


echo "[7/10] Creating provider config"

cat > config/providers.json <<JSON
{
 "providers": {
   "local": {
     "enabled": true,
     "priority": 1
   },
   "mock": {
     "enabled": true,
     "priority": 2
   },
   "openai": {
     "enabled": true,
     "priority": 3
   }
 }
}
JSON


echo "[8/10] Testing API"

python -m agents.api.main &
PID=$!

sleep 3

curl -s http://127.0.0.1:8000/status || true

kill $PID 2>/dev/null || true


echo "[9/10] Building dashboard"

pnpm --filter web build


echo "[10/10] Saving"

git add .

git commit -m "Add full stack router management foundation" || true

git push origin main || true


echo
echo "======================================"
echo " FOUNDATION COMPLETE"
echo
echo "Use:"
echo "./router start"
echo "./router doctor"
echo "======================================"

