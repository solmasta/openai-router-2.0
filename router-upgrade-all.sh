#!/data/data/com.termux/files/usr/bin/bash

set -e

ROOT="$HOME/openai-router-2.0"

echo "🚀 OpenAI Router 2.0 Full Upgrade"

cd "$ROOT"

echo "📦 Backup..."
mkdir -p backups/$(date +%Y%m%d-%H%M%S)
cp -r agents/api backups/$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true

echo "⚙️ Creating provider config..."

mkdir -p agents/data

cat > agents/data/providers.json <<JSON
{
  "providers": {
    "openai": {
      "enabled": true,
      "priority": 1
    },
    "local": {
      "enabled": true,
      "priority": 2
    },
    "mock": {
      "enabled": true,
      "priority": 3
    }
  }
}
JSON


echo "🩺 Creating router diagnostics..."

cat > router-doctor.sh <<'DOCTOR'
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
DOCTOR

chmod +x router-doctor.sh


echo "🔧 Creating developer commands..."

cat > router-cli.sh <<'CLI'
#!/data/data/com.termux/files/usr/bin/bash

case "$1" in

start)
 pkill -f "agents.api.main" || true
 python -m agents.api.main &
 ;;

stop)
 pkill -f "agents.api.main" || true
 ;;

test)
 curl -s http://127.0.0.1:8000/status
 ;;

doctor)
 ./router-doctor.sh
 ;;

build)
 pnpm build:web
 ;;

*)
 echo "Router CLI"
 echo
 echo "start   Start router"
 echo "stop    Stop router"
 echo "test    Test API"
 echo "doctor  Diagnostics"
 echo "build   Build dashboard"
 ;;

esac
CLI

chmod +x router-cli.sh


echo "🏗️ Building dashboard..."

pnpm build:web || echo "Build skipped"


echo "🔄 Restarting API..."

pkill -f "agents.api.main" || true

nohup python -m agents.api.main > router.log 2>&1 &

sleep 3


echo "✅ Health check"

curl -s http://127.0.0.1:8000/status

echo

echo "📌 Git status:"
git status

echo
echo "Upgrade complete."
