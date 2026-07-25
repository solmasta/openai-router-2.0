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
