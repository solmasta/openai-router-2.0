#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Final Hardening"
echo "======================================"

echo "[1] Creating master command"

cat > router <<'ROUTER'
#!/data/data/com.termux/files/usr/bin/bash

CMD=$1

case "$CMD" in

start)
    echo "Starting API..."
    pkill -f "agents.api.main" || true
    python -m agents.api.main &
    sleep 2
    echo "Starting dashboard..."
    pnpm --filter web dev
;;

stop)
    echo "Stopping services..."
    pkill -f "agents.api.main" || true
    pkill -f vite || true
;;

restart)
    $0 stop
    sleep 2
    $0 start
;;

doctor)
    echo "=== Router Health ==="
    curl -s http://127.0.0.1:8000/status || true
    echo
    curl -s http://127.0.0.1:8000/router || true
;;

build)
    pnpm --filter web build
;;

backup)
    ./scripts/backup.sh
;;

*)
    echo "OpenAI Router Commands:"
    echo " start"
    echo " stop"
    echo " restart"
    echo " doctor"
    echo " build"
    echo " backup"
;;

esac
ROUTER

chmod +x router



echo "[2] Creating clean installer"

cat > install-final.sh <<'INSTALL'
#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Installing OpenAI Router 2.0"

pnpm install

if [ ! -f .env ]; then

cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
ENV

fi

chmod +x router

echo "Install complete"
echo "Run:"
echo "./router start"

INSTALL

chmod +x install-final.sh



echo "[3] Find duplicate folders"

find . -maxdepth 3 -type d -name "openai-router-2.0" -print



echo "[4] Build verification"

pnpm --filter web build



echo "[5] Git cleanup"

git add .

git commit -m "Final hardening release preparation" || true

git push origin main || true



echo "[6] Create release tag"

git tag -a v2.0.0 -m "OpenAI Router 2.0 stable release" || true

git push origin v2.0.0 || true


echo "======================================"
echo " HARDENING COMPLETE"
echo
echo "Fresh install:"
echo "./install-final.sh"
echo
echo "Start:"
echo "./router start"
echo "======================================"

