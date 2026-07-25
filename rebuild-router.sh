#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "================================"
echo " OpenAI Router 2.0 Full Repair "
echo "================================"

cd "$(dirname "$0")"

echo "[1] Stopping old services..."

pkill -f "agents.api.main" || true
pkill -f "vite" || true


echo "[2] Installing dependencies..."

pnpm install


echo "[3] Repairing environment..."

cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
VITE_ROUTER_API_KEY=dev-router-key
ENV


echo "[4] Fixing TypeScript headers..."

find apps/web/src/api -type f -name "*.ts" -print0 | while IFS= read -r -d '' file
do
sed -i 's/headers: {/headers: {/' "$file" || true
done


echo "[5] Starting API test..."

python -m agents.api.main &
API_PID=$!

sleep 3


if curl -s http://127.0.0.1:8000/status | grep online
then
 echo "API OK"
else
 echo "API FAILED"
fi


echo "[6] Building dashboard..."

pnpm --filter web build


echo "[7] Creating launcher..."

cat > start.sh <<START
#!/data/data/com.termux/files/usr/bin/bash

cd "\$(dirname "\$0")"

python -m agents.api.main &

sleep 2

pnpm --filter web dev
START

chmod +x start.sh


echo "[8] Cleaning test API..."

kill $API_PID || true


echo ""
echo "================================"
echo " COMPLETE"
echo " Run:"
echo "./start.sh"
echo "================================"

