#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Platform Polish"
echo "======================================"

mkdir -p apps/web/src/components


echo "[1] Adding activity feed API"


cat > apps/web/src/api/events.ts <<'TS'
const API =
 import.meta.env.VITE_ROUTER_API_URL ||
 "http://127.0.0.1:8000"


export async function getEvents(){

 const response =
 await fetch(
  `${API}/events`
 )

 return response.json()

}
TS



echo "[2] Creating live activity component"


cat > apps/web/src/components/ActivityFeed.tsx <<'TSX'
import {
 useEffect,
 useState
} from "react"

import {
 getEvents
} from "../api/events"


export default function ActivityFeed(){

const [events,setEvents] =
useState<any[]>([])


useEffect(()=>{

const refresh = () =>
 getEvents()
 .then(setEvents)
 .catch(()=>{})


refresh()


const timer =
setInterval(
 refresh,
 5000
)


return ()=>clearInterval(timer)


},[])


return (

<div className="card">

<h2>
Activity Feed
</h2>


{
events
.slice()
.reverse()
.map(
(event,index)=>(

<div key={index}>

<p>
{event.time}
</p>

<strong>
{event.event}
</strong>

<p>
{JSON.stringify(event.data)}
</p>

</div>

)

)
}

</div>

)

}
TSX



echo "[3] Add component to dashboard"


python - <<'PY'
from pathlib import Path

p=Path("apps/web/src/App.tsx")

s=p.read_text()

if "ActivityFeed" not in s:

    s='import ActivityFeed from "./components/ActivityFeed"\n'+s

    s=s.replace(
        "</main>",
        """
<ActivityFeed />

</main>
"""
    )

p.write_text(s)

PY



echo "[4] Add router deploy helper"


cat > router-deploy.sh <<'SH'
#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Building dashboard..."

pnpm --filter web build


echo "Checking backend..."

curl -s http://127.0.0.1:8000/status || true


echo "Deployment package ready"

SH


chmod +x router-deploy.sh



echo "[5] Add final health command"


cat >> router <<'EOF'

