#!/data/data/com.termux/files/usr/bin/bash

echo "======================================"
echo " OpenAI Router System Doctor"
echo "======================================"

PASS=0
FAIL=0

check() {
    NAME="$1"
    CMD="$2"

    echo
    echo "[CHECK] $NAME"

    if eval "$CMD" >/dev/null 2>&1; then
        echo " OK"
        PASS=$((PASS+1))
    else
        echo " FAIL"
        FAIL=$((FAIL+1))
    fi
}


check "Python" "python --version"

check "Node" "node --version"

check "pnpm" "pnpm --version"

check "API status" \
"curl -s http://127.0.0.1:8000/status"

check "Providers endpoint" \
"curl -s http://127.0.0.1:8000/providers"

check "History endpoint" \
"curl -s http://127.0.0.1:8000/history"

check "Metrics endpoint" \
"curl -s http://127.0.0.1:8000/metrics"

check "Live events endpoint" \
"curl -s http://127.0.0.1:8000/live-events"


echo
echo "======================================"
echo " Passed: $PASS"
echo " Failed: $FAIL"
echo "======================================"

if [ "$FAIL" -eq 0 ]; then
    echo "SYSTEM HEALTHY"
    exit 0
else
    echo "ISSUES FOUND"
    exit 1
fi
