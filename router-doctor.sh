#!/data/data/com.termux/files/usr/bin/bash

echo "OpenAI Router Doctor"
echo

echo "Status:"
curl -s http://127.0.0.1:8000/status
echo

echo
echo "Router:"
curl -s http://127.0.0.1:8000/router
echo

echo
echo "Metrics:"
curl -s http://127.0.0.1:8000/metrics || true
echo

echo
echo "History:"
curl -s http://127.0.0.1:8000/history | tail -c 300
echo
