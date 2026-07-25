#!/data/data/com.termux/files/usr/bin/bash

ROOT="$(cd "$(dirname "$0")" && pwd)"
ENVFILE="$ROOT/.env"

touch "$ENVFILE"

set_secret() {
    KEY="$2"

    if grep -q "^$1=" "$ENVFILE"; then
        sed -i "s|^$1=.*|$1=$KEY|" "$ENVFILE"
    else
        echo "$1=$KEY" >> "$ENVFILE"
    fi

    echo "Saved $1"
}

list_secrets() {
    echo "Configured secrets:"
    cut -d= -f1 "$ENVFILE"
}

remove_secret() {
    sed -i "/^$2=/d" "$ENVFILE"
    echo "Removed $2"
}

case "$1" in

set)
    set_secret "$2" "$3"
    ;;

list)
    list_secrets
    ;;

remove)
    remove_secret "$1" "$2"
    ;;

*)
    echo "Usage:"
    echo " secrets.sh set NAME VALUE"
    echo " secrets.sh list"
    echo " secrets.sh remove NAME"
    ;;

esac
