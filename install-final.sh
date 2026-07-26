#!/data/data/com.termux/files/usr/bin/bash

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "======================================"
echo " OpenAI Router 2.0 Final Installer"
echo "======================================"

cd "$ROOT"

echo "[1/6] Installing dependencies"
pnpm install

echo "[2/6] Creating environment"

if [ ! -f .env ]; then
cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
VITE_ROUTER_API_KEY=dev-router-key
ENV
fi


echo "[3/6] Building dashboard"

pnpm --filter web build


echo "[4/6] Checking router tools"

chmod +x router
chmod +x router-control.sh
chmod +x router-doctor.sh


echo "[5/6] Testing API"

./router start || true

sleep 3

curl -s http://127.0.0.1:8000/status || true

echo


echo "[6/6] Complete"

echo
echo "Commands:"
echo "./router start"
echo "./router stop"
echo "./router restart"
echo "./router doctor"
echo "./router build"

