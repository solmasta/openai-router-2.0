#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "=== OpenAI Router 2.0 Installer ==="

cd "$(dirname "$0")"

echo "[1/5] Installing dependencies..."
pnpm install

echo "[2/5] Creating environment file..."

if [ ! -f .env ]; then
cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
VITE_ROUTER_API_KEY=dev-router-key
ENV
fi

echo "[3/5] Creating start script..."

cat > start-router.sh <<START
#!/data/data/com.termux/files/usr/bin/bash

cd "$(pwd)"

echo "Starting OpenAI Router API..."
python -m agents.api.main &

sleep 2

echo "Starting dashboard..."
pnpm --filter web dev
START

chmod +x start-router.sh

echo "[4/5] Checking API..."

python -m agents.api.main &
PID=$!

sleep 2

curl -s http://127.0.0.1:8000/status || true

kill $PID || true

echo "[5/5] Complete!"

echo ""
echo "Run:"
echo "./start-router.sh"
