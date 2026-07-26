#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Production Pack"
echo "======================================"

mkdir -p backups logs config docker


echo "[1] Creating environment template"

cat > .env.example <<'ENV'
VITE_ROUTER_API_URL=http://127.0.0.1:8000
VITE_ROUTER_API_KEY=change-me

OPENAI_API_KEY=
ENV



echo "[2] Creating backup utility"

cat > scripts/backup.sh <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash

DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p backups

tar -czf \
"backups/router-$DATE.tar.gz" \
agents \
apps \
config \
.env.example

echo "Backup created:"
echo backups/router-$DATE.tar.gz
SCRIPT


chmod +x scripts/backup.sh



echo "[3] Creating diagnostics"


cat > scripts/doctor.sh <<'SCRIPT'
#!/data/data/com.termux/files/usr/bin/bash

echo "=== Router Doctor ==="

echo

echo "Python:"
python --version

echo

echo "Node:"
node --version

echo

echo "pnpm:"
pnpm --version

echo

echo "API:"
curl -s http://127.0.0.1:8000/status || echo "API offline"

echo

echo "Providers:"
curl -s http://127.0.0.1:8000/providers || true

echo

echo "Build:"
pnpm --filter web build

echo

echo "Complete"
SCRIPT


chmod +x scripts/doctor.sh



echo "[4] Creating Docker configuration"


cat > docker/Dockerfile.api <<'DOCKER'
FROM python:3.12-slim

WORKDIR /app

COPY . .

RUN pip install httpx

EXPOSE 8000

CMD ["python","-m","agents.api.main"]
DOCKER



cat > docker-compose.yml <<'YAML'
services:

  router-api:
    build:
      context: .
      dockerfile: docker/Dockerfile.api
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
YAML



echo "[5] Add Make commands"


cat > Makefile <<'MAKE'
start:
	./router start

stop:
	./router stop

restart:
	./router restart

doctor:
	./scripts/doctor.sh

backup:
	./scripts/backup.sh

build:
	pnpm --filter web build
MAKE



echo "[6] Update router command"


python - <<'PY'
from pathlib import Path

p=Path("router")

if p.exists():

    s=p.read_text()

    s=s.replace(
        'doctor)',
        'backup)\n./scripts/backup.sh\n;;\n\ndoctor)'
    )

    p.write_text(s)

PY



echo "[7] Test build"

pnpm --filter web build



echo "[8] Commit"

git add .

git commit -m "Add production pack tooling" || true

git push origin main || true


echo "======================================"
echo " PRODUCTION PACK COMPLETE"
echo
echo "Commands:"
echo "./router doctor"
echo "./router backup"
echo "make build"
echo "======================================"

