#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"
PIDFILE="$ROOT/router.pid"
LOGFILE="$ROOT/router.log"

start() {
    if [ -f "$PIDFILE" ]; then
        PID=$(cat "$PIDFILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo "Router already running PID=$PID"
            exit
        fi
    fi

    echo "Starting router..."

    cd "$ROOT"

    python -m agents.api.main >> "$LOGFILE" 2>&1 &

    echo $! > "$PIDFILE"

    sleep 2

    curl -s http://127.0.0.1:8000/status
}

stop() {
    if [ -f "$PIDFILE" ]; then
        PID=$(cat "$PIDFILE")
        kill "$PID" 2>/dev/null || true
        rm "$PIDFILE"
        echo "Router stopped"
    else
        echo "Router not running"
    fi
}

status() {
    if [ -f "$PIDFILE" ]; then
        PID=$(cat "$PIDFILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo "Running PID=$PID"
            curl -s http://127.0.0.1:8000/status
            exit
        fi
    fi

    echo "Router offline"
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
*)
    echo "Usage:"
    echo " service.sh start"
    echo " service.sh stop"
    echo " service.sh restart"
    echo " service.sh status"
    ;;
esac
