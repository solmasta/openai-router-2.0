#!/data/data/com.termux/files/usr/bin/bash

echo "Starting OpenAI Router 2.0..."

cd "$(dirname "$0")"

echo "Starting router agent..."
python -m agents.api.main > router.log 2>&1 &

sleep 2

echo "Starting web dashboard..."
pnpm --filter web dev
