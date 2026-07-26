#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Patching installer safety..."

python - <<'PY'
from pathlib import Path

p = Path("install-final.sh")

s = p.read_text()

old = """
echo "Install complete"
echo "Run:"
echo "./router start"
"""

new = """
echo ""
echo "Checking existing API..."

if curl -s http://127.0.0.1:8000/status >/dev/null; then
    echo "API already running on port 8000"
else
    echo "API not running"
fi

echo ""
echo "Install complete"
echo "Run:"
echo "./router start"
"""

if old in s:
    s=s.replace(old,new)

p.write_text(s)

PY

chmod +x install-final.sh

git add install-final.sh
git commit -m "Make installer port check safer"
git push origin main || true

echo "Done"
