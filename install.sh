#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "=== OpenAI Router 2.0 Installer ==="

cd "$(dirname "$0")"

echo "[1/5] Cleaning old processes..."

pkill -f "agents.api.main" || true

echo "[2/5] Installing dependencies..."

pnpm install

echo "[3/5] Creating environment..."

if [ ! -f .env ]; then
cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
VITE_ROUTER_API_KEY=dev-router-key
ENV
fi

echo "[4/5] Creating launcher..."

cat > start-router.sh <<START
#!/data/data/com.termux/files/usr/bin/bash

cd "\$(dirname "\$0")"

pkill -f "agents.api.main" || true

echo "Starting API..."
python -m agents.api.main > router.log 2>&1 &

sleep 2

echo "Checking API..."
curl -s http://127.0.0.1:8000/status

echo ""
echo "Starting dashboard..."

pnpm --filter web dev --host
START

chmod +x start-router.sh

echo "[5/5] Testing API..."

python -m agents.api.main > /tmp/router-test.log 2>&1 &

PID=$!

sleep 2

curl -s http://127.0.0.1:8000/status

kill $PID || true

echo ""
echo "Installation complete!"
echo ""
echo "Start everything:"
echo "./start-router.sh"
