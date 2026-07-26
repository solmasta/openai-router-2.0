#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Fixing App.tsx imports..."

python - <<'PY'
from pathlib import Path

p = Path("apps/web/src/App.tsx")

s = p.read_text()

# Remove all duplicate lines
lines = s.splitlines()

seen = set()
out = []

for line in lines:
    if line.strip() in [
        'import Intelligence from "./components/Intelligence"',
        'import Providers from "./components/Providers"'
    ]:
        if line.strip() in seen:
            continue
        seen.add(line.strip())

    out.append(line)


s = "\n".join(out)


# Ensure imports exist once at top
imports = [
'import Intelligence from "./components/Intelligence"',
'import Providers from "./components/Providers"'
]


for imp in imports:
    if imp not in s:
        s = imp + "\n" + s


p.write_text(s)

PY


echo "Building..."

pnpm --filter web build


echo "Saving..."

git add apps/web/src/App.tsx

git commit -m "Fix duplicate dashboard imports" || true

git push origin main || true


echo "Dashboard repair complete"
