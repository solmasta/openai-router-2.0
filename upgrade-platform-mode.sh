#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Platform Mode"
echo "======================================"

mkdir -p agents/db


echo "[1] Creating database layer"


cat > agents/db/database.py <<'PY'
import sqlite3
from pathlib import Path


DB = Path(
    "agents/data/router.db"
)


def connect():

    return sqlite3.connect(DB)



def init():

    db = connect()

    cur = db.cursor()


    cur.execute("""
    CREATE TABLE IF NOT EXISTS requests(
        id INTEGER PRIMARY KEY,
        time TEXT,
        message TEXT,
        provider TEXT,
        response TEXT
    )
    """)


    cur.execute("""
    CREATE TABLE IF NOT EXISTS providers(
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE,
        requests INTEGER DEFAULT 0,
        success INTEGER DEFAULT 0,
        failure INTEGER DEFAULT 0
    )
    """)


    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        role TEXT
    )
    """)


    db.commit()
    db.close()



init()
PY



echo "[2] Creating database API"


cat > agents/api/database_api.py <<'PY'
from agents.db.database import connect


def save_request(
    message,
    provider,
    response
):

    db=connect()

    db.execute(
        """
        INSERT INTO requests
        (time,message,provider,response)
        VALUES
        (datetime('now'),?,?,?)
        """,
        (
            message,
            provider,
            str(response)
        )
    )

    db.commit()
    db.close()



def list_requests():

    db=connect()

    rows=db.execute(
        """
        SELECT *
        FROM requests
        ORDER BY id DESC
        LIMIT 100
        """
    ).fetchall()

    db.close()

    return rows
PY



echo "[3] Adding platform endpoint"


python - <<'PY'

from pathlib import Path

p=Path("agents/api/main.py")

s=p.read_text()


if "database_api" not in s:

    s=s.replace(
"from agents.api.history import save_execution, get_history",
"from agents.api.history import save_execution, get_history\nfrom agents.api.database_api import list_requests"
    )


s=s.replace(
'elif self.path == "/history":',
'elif self.path == "/database-history":\n            self.send_json(list_requests())\n\n        elif self.path == "/history":'
)


p.write_text(s)

PY



echo "[4] Creating admin config"


cat > config/admin.json <<JSON
{
 "users": [
   {
    "username":"admin",
    "role":"administrator"
   }
 ]
}
JSON



echo "[5] Build test"

pnpm --filter web build



echo "[6] Save changes"

git add .

git commit -m "Add platform database and admin foundation" || true

git push origin main || true



echo "======================================"
echo " PLATFORM MODE COMPLETE"
echo
echo "Test:"
echo "curl http://127.0.0.1:8000/database-history"
echo "======================================"

