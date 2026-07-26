#!/data/data/com.termux/files/usr/bin/bash

echo "=== Router Doctor ==="

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

echo "API:"
curl -s http://127.0.0.1:8000/status || echo "API offline"

echo

echo "Providers:"
curl -s http://127.0.0.1:8000/providers || true

echo

echo "Build:"
pnpm --filter web build

echo

echo "Complete"
