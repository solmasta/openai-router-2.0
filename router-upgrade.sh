#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "🚀 OpenAI Router 2.0 Upgrade Pipeline"

cd ~/openai-router-2.0

echo "📦 Installing dependencies..."
pnpm install

echo "🔎 Checking git..."
git status

echo "🧪 Building web..."
pnpm build:web

echo "🔄 Restarting router..."
pkill -f "agents.api.main" || true

nohup python -m agents.api.main > router.log 2>&1 &

sleep 3

echo "❤️ Health check..."
curl -s http://127.0.0.1:8000/status

echo

echo "📊 Metrics..."
curl -s http://127.0.0.1:8000/metrics || true

echo

echo "📜 History..."
curl -s http://127.0.0.1:8000/history || true

echo

echo "✅ Upgrade complete"
