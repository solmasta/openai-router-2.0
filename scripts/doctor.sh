#!/data/data/com.termux/files/usr/bin/bash

echo "=== OpenAI Router Doctor ==="

echo ""
echo "Python:"
python --version

echo ""
echo "pnpm:"
pnpm --version

echo ""
echo "API:"
curl -s http://127.0.0.1:8000/status || echo "offline"

echo ""
echo "Port:"
ss -tln | grep 8000 || echo "8000 not listening"

echo ""
echo "Files:"
test -f config/router.json && echo "config OK" || echo "config missing"

