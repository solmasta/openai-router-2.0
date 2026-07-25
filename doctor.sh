#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "=== OpenAI Router Doctor ==="
echo ""

echo "[Python]"
python --version || echo "Python missing"

echo ""

echo "[Node]"
node --version || echo "Node missing"

echo ""

echo "[pnpm]"
pnpm --version || echo "pnpm missing"

echo ""

echo "[Config]"
if [ -f "$ROOT/config/router.json" ]; then
    echo "OK: config/router.json"
else
    echo "Missing config"
fi

echo ""

echo "[API]"
curl -s http://127.0.0.1:8000/status || echo "API offline"

echo ""

echo "[Port]"
if lsof -i :8000 >/dev/null 2>&1; then
    echo "Port 8000 active"
else
    echo "Port 8000 free"
fi

echo ""

echo "[Providers]"
curl -s http://127.0.0.1:8000/router || true

echo ""

echo "=== Done ==="
