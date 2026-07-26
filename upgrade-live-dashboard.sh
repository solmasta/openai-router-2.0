#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router v2.1 Live Dashboard"
echo "======================================"

mkdir -p apps/web/src/components


echo "[1] Creating live monitor component"


cat > apps/web/src/components/LiveMonitor.tsx <<'TSX'
import {
  useEffect,
  useState
} from "react"

import {
  getLiveEvents
} from "../api/live"


export default function LiveMonitor(){

const [events,setEvents] =
useState<any[]>([])


useEffect(()=>{

const update = () => {

 getLiveEvents()
 .then(setEvents)
 .catch(()=>{})

}


update()


const timer =
setInterval(
 update,
 3000
)


return () =>
clearInterval(timer)


},[])


return (

<div className="card">

<h2>
Live Router Monitor
</h2>


{
events
.slice()
.reverse()
.map(
(event,index)=>(

<div key={index}>

<strong>
{event.event}
</strong>

<p>
{event.time}
</p>

<small>
{JSON.stringify(event.payload)}
</small>

<hr />

</div>

)

)
}

</div>

)

}
TSX



echo "[2] Adding monitor to App"


python - <<'PY'
from pathlib import Path

p=Path("apps/web/src/App.tsx")

s=p.read_text()

if "LiveMonitor" not in s:

    s='import LiveMonitor from "./components/LiveMonitor"\n'+s

    s=s.replace(
        "</main>",
        """
<LiveMonitor />

</main>
"""
    )

p.write_text(s)

PY



echo "[3] Build dashboard"

pnpm --filter web build


echo "[4] Save changes"

git add .

git commit -m "Add live router monitoring dashboard" || true

git push origin main || true


echo "======================================"
echo " LIVE DASHBOARD COMPLETE"
echo "======================================"

