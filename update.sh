#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "=== OpenAI Router Update ==="

cd "$ROOT"

echo "[1/5] Checking repository..."

git status

echo ""

echo "[2/5] Pulling latest changes..."

git pull origin main

echo ""

echo "[3/5] Installing dependencies..."

pnpm install

echo ""

echo "[4/5] Building dashboard..."

pnpm build || echo "Build skipped on unsupported platforms"

echo ""

echo "[5/5] Restarting router..."

./service.sh restart

echo ""

echo "=== Update Complete ==="
