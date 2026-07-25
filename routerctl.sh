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
