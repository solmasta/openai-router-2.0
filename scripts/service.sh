#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PIDFILE="$ROOT/runtime/router.pid"
LOGFILE="$ROOT/router.log"

start() {
    if [ -f "$PIDFILE" ]; then
        PID=$(cat "$PIDFILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo "Router already running PID $PID"
            exit 0
        fi
    fi

    echo "Starting OpenAI Router API..."

    cd "$ROOT"

    python -m agents.api.main >> "$LOGFILE" 2>&1 &

    echo $! > "$PIDFILE"

    sleep 2

    echo "Started PID $(cat "$PIDFILE")"
}


stop() {
    if [ -f "$PIDFILE" ]; then
        kill "$(cat "$PIDFILE")" 2>/dev/null || true
        rm -f "$PIDFILE"
        echo "Router stopped"
    else
        echo "Router is not running"
    fi
}


restart() {
    stop
    sleep 2
    start
}


status() {
    if [ -f "$PIDFILE" ]; then
        PID=$(cat "$PIDFILE")

        if kill -0 "$PID" 2>/dev/null; then
            echo "Router process running: $PID"
        else
            echo "PID exists but process is dead"
        fi
    else
        echo "Router stopped"
    fi

    echo ""
    curl -s http://127.0.0.1:8000/status || echo "API offline"
}


case "$1" in
start) start ;;
stop) stop ;;
restart) restart ;;
status) status ;;
*)
echo "Usage: service.sh start|stop|restart|status"
;;
esac
