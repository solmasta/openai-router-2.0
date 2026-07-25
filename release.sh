#!/data/data/com.termux/files/usr/bin/bash

set -e

VERSION=${1:-v2.0.$(date +%Y%m%d)}

echo "🚀 OpenAI Router Release Pipeline"
echo "Version: $VERSION"

echo
echo "📋 Checking git..."
git status

echo
echo "🏗 Building web..."
pnpm build:web

echo
echo "🩺 Checking router..."

if curl -sf http://127.0.0.1:8000/status >/dev/null; then
    echo "Router online ✅"
else
    echo "Router offline - starting..."
    ./router-cli.sh start
    sleep 3
fi

echo
echo "🧪 Testing endpoints..."

curl -s http://127.0.0.1:8000/status
echo

curl -s http://127.0.0.1:8000/router
echo

echo
echo "📦 Committing..."

git add .

git commit -m "Release $VERSION" || true

echo
echo "🏷 Creating tag..."

git tag -a "$VERSION" -m "OpenAI Router $VERSION" || true

echo
echo "⬆️ Pushing..."

git push origin main

git push origin "$VERSION" || true

echo
echo "✅ Release complete"
echo "Tag: $VERSION"
