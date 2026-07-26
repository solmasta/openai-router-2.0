#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router v2.0.0 Release"
echo "======================================"

echo "[1] Checking status"

git status


echo "[2] Creating release tag"

if git rev-parse v2.0.0 >/dev/null 2>&1; then
    echo "Tag already exists"
else
    git tag -a v2.0.0 -m "OpenAI Router 2.0.0 stable release"
fi


echo "[3] Pushing tag"

git push origin v2.0.0 || true


echo "[4] Final build"

pnpm --filter web build


echo "[5] Release summary"

echo ""
echo "Version:"
cat VERSION 2>/dev/null || echo "VERSION file missing"

echo ""

echo "Latest commit:"
git log -1 --oneline


echo ""

echo "======================================"
echo " RELEASE READY"
echo "======================================"

echo ""
echo "Next:"
echo "Create GitHub Release from tag v2.0.0"

