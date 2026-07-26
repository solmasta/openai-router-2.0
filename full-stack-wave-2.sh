#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Full Stack Wave 2"
echo "======================================"

mkdir -p agents/api/admin
mkdir -p agents/api/database
mkdir -p apps/web/src/admin
mkdir -p apps/web/src/components


echo "[1] Admin database foundation"

cat > agents/api/admin/store.py <<'PY'
from agents.api.database.db import connect


def set_setting(key,value):
    conn=connect()
    cur=conn.cursor()

    cur.execute(
        """
        INSERT INTO admin(key,value)
        VALUES(?,?)
        ON CONFLICT(key)
        DO UPDATE SET value=excluded.value
        """,
        (key,value)
    )

    conn.commit()
    conn.close()


def get_settings():
    conn=connect()
    cur=conn.cursor()

    cur.execute(
        "SELECT key,value FROM admin"
    )

    rows=cur.fetchall()
    conn.close()

    return {
        x[0]:x[1]
        for x in rows
    }
PY


echo "[2] Admin API module"

cat > agents/api/admin/__init__.py <<'PY'
PY


echo "[3] Provider control foundation"

cat > agents/api/admin/providers.py <<'PY'
from agents.api.provider_registry import list_providers


def admin_providers():
    return list_providers()
PY


echo "[4] Frontend admin panel"

cat > apps/web/src/admin/AdminPanel.tsx <<'TSX'
import {useEffect,useState} from "react"

export default function AdminPanel(){

const [data,setData]=useState<any>({})

useEffect(()=>{

fetch(
"http://127.0.0.1:8000/providers"
)
.then(r=>r.json())
.then(setData)

},[])


return (
<div className="card">

<h2>
Admin Control Center
</h2>

<pre>
{JSON.stringify(data,null,2)}
</pre>

</div>
)

}
TSX


echo "[5] Build check"

pnpm --filter web build


echo "[6] Commit"

git add .

git commit -m "Full stack wave 2 admin foundation" || true

git push origin main || true


echo "======================================"
echo " WAVE 2 COMPLETE"
echo "======================================"
