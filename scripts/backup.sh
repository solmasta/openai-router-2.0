#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

mkdir -p backups

tar -czf \
"backups/router-$(date +%Y%m%d-%H%M%S).tar.gz" \
agents config apps

echo "Backup complete"
