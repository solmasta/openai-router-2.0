#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router 2.0.0 Release Verify"
echo "======================================"

TEST="$HOME/openai-router-release-test"

echo "[1] Cleaning old test"
rm -rf "$TEST"

echo "[2] Fresh clone"
git clone https://github.com/solmasta/openai-router-2.0 "$TEST"

cd "$TEST"

echo "[3] Installer test"
./install-final.sh

echo "[4] Tool check"

test -x router
test -x router-control.sh
test -x router-doctor.sh

echo "Tools OK"

echo "[5] Start API"

./router start || true

sleep 3

echo "[6] API health"

curl -f http://127.0.0.1:8000/status

echo

echo "[7] Providers"

curl -f http://127.0.0.1:8000/providers

echo

echo "[8] Live events"

curl -f http://127.0.0.1:8000/live-events

echo

echo "[9] Dashboard build"

pnpm --filter web build

echo

echo "[10] Stop"

./router stop || true

echo "======================================"
echo " RELEASE VERIFY PASSED"
echo "======================================"
