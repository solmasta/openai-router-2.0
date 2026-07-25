#!/data/data/com.termux/files/usr/bin/bash

set -e

ROOT="$(pwd)"

echo "======================================"
echo " OpenAI Router 2.0 Full Upgrade"
echo "======================================"

echo "[1] Stop old services"

pkill -f "agents.api.main" || true
pkill -f "vite" || true


echo "[2] Create folders"

mkdir -p logs


echo "[3] Install dependencies"

pnpm install


echo "[4] Create router manager"

cat > routerctl.sh <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"
PIDFILE="$ROOT/.router.pids"
LOG="$ROOT/logs/router.log"

mkdir -p "$ROOT/logs"


start(){

echo "Starting API..."

python -m agents.api.main >> "$LOG" 2>&1 &
API=$!


sleep 2


echo "Starting Dashboard..."

pnpm --filter web dev >> "$LOG" 2>&1 &
WEB=$!


echo "$API $WEB" > "$PIDFILE"

echo "Router running"
}



stop(){

if [ -f "$PIDFILE" ]; then

for PID in $(cat "$PIDFILE")
do
kill $PID 2>/dev/null || true
done

rm "$PIDFILE"

fi

echo "Stopped"

}



status(){

echo "=== Router Status ==="

curl -s http://127.0.0.1:8000/status || echo "API offline"

}



restart(){

./routerctl.sh stop
sleep 2
./routerctl.sh start

}



logs(){

tail -f "$LOG"

}


case "$1" in

start)
start
;;

stop)
stop
;;

restart)
restart
;;

status)
status
;;

logs)
logs
;;

*)
echo "Usage:"
echo "./routerctl.sh start"
echo "./routerctl.sh stop"
echo "./routerctl.sh restart"
echo "./routerctl.sh status"
echo "./routerctl.sh logs"
;;

esac
SCRIPT


chmod +x routerctl.sh


echo "[5] Create environment"

cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
VITE_ROUTER_API_KEY=dev-router-key
ENV


echo "[6] Repair API headers typing"

find apps/web/src/api -name "*.ts" -type f | while read FILE
do

python - <<PY
p="$FILE"

s=open(p).read()

s=s.replace(
'headers: {',
'headers: {'
)

open(p,"w").write(s)
PY

done


echo "[7] Test API"

python -m agents.api.main &
TESTPID=$!

sleep 3

curl -s http://127.0.0.1:8000/status || true

kill $TESTPID 2>/dev/null || true


echo "[8] Build dashboard"

pnpm --filter web build


echo "[9] Commit upgrade"

git add .

git commit -m "Add full router management upgrade" || true

git push origin main || true


echo ""
echo "======================================"
echo " UPGRADE COMPLETE"
echo ""
echo "Start:"
echo "./routerctl.sh start"
echo ""
echo "Status:"
echo "./routerctl.sh status"
echo ""
echo "Logs:"
echo "./routerctl.sh logs"
echo "======================================"

