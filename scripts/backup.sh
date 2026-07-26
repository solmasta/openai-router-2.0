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
