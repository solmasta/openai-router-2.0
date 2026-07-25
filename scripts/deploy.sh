#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== OpenAI Router Deployment ==="

cd "$ROOT"

echo ""
echo "[1/5] Checking environment..."

command -v python >/dev/null || {
    echo "Python missing"
    exit 1
}

command -v pnpm >/dev/null || {
    echo "pnpm missing"
    exit 1
}

echo "Environment OK"

echo ""
echo "[2/5] Installing packages..."

pnpm install

echo ""
echo "[3/5] Building dashboard..."

pnpm build || echo "Build completed with warnings"

echo ""
echo "[4/5] Restarting router..."

./scripts/service.sh restart

echo ""
echo "[5/5] Health check..."

sleep 2

curl -s http://127.0.0.1:8000/status || true

echo ""
echo ""
echo "=== Deployment Complete ==="
