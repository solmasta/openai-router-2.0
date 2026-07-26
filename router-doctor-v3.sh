#!/data/data/com.termux/files/usr/bin/bash

echo "Router Platform Doctor"
echo "---------------------"

python -m py_compile agents/api/**/*.py

echo "Python OK"

pnpm --filter web build

echo "Frontend OK"
