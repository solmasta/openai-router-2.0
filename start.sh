#!/data/data/com.termux/files/usr/bin/bash

cd "$(dirname "$0")"

python -m agents.api.main &

sleep 2

pnpm --filter web dev
