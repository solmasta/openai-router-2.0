#!/data/data/com.termux/files/usr/bin/bash

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
PIDFILE="$ROOT/.router.pid"

start() {
    if [ -f "$PIDFILE" ]; then
        PID=$(cat "$PIDFILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo "Router already running PID $PID"
            return
        fi
    fi

    echo "Starting OpenAI Router..."

    cd "$ROOT"

    python -m agents.api.main &

    PID=$!
    echo "$PID" > "$PIDFILE"

    sleep 2

    curl -s http://127.0.0.1:8000/status || true

    echo
    echo "Router started PID $PID"
}


stop() {
    if [ -f "$PIDFILE" ]; then
        PID=$(cat "$PIDFILE")

        echo "Stopping Router PID $PID"

        kill "$PID" 2>/dev/null || true

        rm -f "$PIDFILE"
    else
        echo "No router PID found"
    fi
}


restart() {
    stop
    sleep 2
    start
}


doctor() {
    echo "=== OpenAI Router Doctor ==="

    echo
    echo "Python:"
    python --version

    echo
    echo "Node:"
    node --version

    echo
    echo "pnpm:"
    pnpm --version

    echo
    echo "API status:"
    curl -s http://127.0.0.1:8000/status || echo "API offline"

    echo
    echo "Providers:"
    curl -s http://127.0.0.1:8000/providers || true

    echo
    echo "Live events:"
    curl -s http://127.0.0.1:8000/live-events || true

    echo
    echo "============================"
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
    doctor)
        doctor
        ;;
    *)
        echo "Usage:"
        echo "./router-control.sh start"
        echo "./router-control.sh stop"
        echo "./router-control.sh restart"
        echo "./router-control.sh doctor"
        ;;
esac
