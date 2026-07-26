#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Building dashboard..."

pnpm --filter web build


echo "Checking backend..."

curl -s http://127.0.0.1:8000/status || true


echo "Deployment package ready"

