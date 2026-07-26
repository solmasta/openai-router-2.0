#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Installing OpenAI Router 2.0"

pnpm install

if [ ! -f .env ]; then

cat > .env <<ENV
VITE_ROUTER_API_URL=http://127.0.0.1:8000
ENV

fi

chmod +x router

echo "Install complete"
echo "Run:"
echo "./router start"

