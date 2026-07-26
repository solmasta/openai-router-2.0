#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "======================================"
echo " OpenAI Router Dashboard v2"
echo "======================================"


mkdir -p apps/web/src/components


echo "[1] Creating intelligence component"


cat > apps/web/src/components/Intelligence.tsx <<'TSX'
import {useEffect,useState} from "react"

import {
 getIntelligence
} from "../api/intelligence"


export default function Intelligence(){

const [data,setData]=useState<any>({})


useEffect(()=>{

getIntelligence()
.then(setData)


const timer=setInterval(
()=>getIntelligence().then(setData),
5000
)


return ()=>clearInterval(timer)

},[])


return (

<div className="card">

<h2>
Router Intelligence
</h2>


{
Object.entries(data).map(
([name,value]:any)=>(

<div key={name}>

<h3>
{name}
</h3>


<p>
Requests: {value.requests}
</p>


<p>
Success: {value.success}
</p>


<p>
Failures: {value.failure}
</p>


<p>
Score: {value.score}
</p>


<p>
Latency: {Number(value.latency).toFixed(3)}s
</p>

</div>

)

)
}

</div>

)

}
TSX



echo "[2] Creating provider status component"


cat > apps/web/src/components/Providers.tsx <<'TSX'
import {
useEffect,
useState
} from "react"


const API =
import.meta.env.VITE_ROUTER_API_URL ||
"http://127.0.0.1:8000"


export default function Providers(){

const [providers,setProviders]=useState<any[]>([])


useEffect(()=>{

fetch(
`${API}/providers`
)
.then(r=>r.json())
.then(setProviders)


},[])



return (

<div className="card">

<h2>
Providers
</h2>


{
providers.map(
p=>(

<p key={p.id}>

{p.name}

&nbsp;

<strong>
{p.status}
</strong>

</p>

)

)
}

</div>

)

}
TSX



echo "[3] Update App dashboard"


python - <<'PY'

p="apps/web/src/App.tsx"

s=open(p).read()


if 'Intelligence' not in s:

    s=s.replace(
'import',
'import Intelligence from "./components/Intelligence"\nimport Providers from "./components/Providers"\n\nimport'
    )


    s=s.replace(
'</main>',
'''
<Providers />

<Intelligence />

</main>
'''
    )


open(p,"w").write(s)

PY



echo "[4] Build dashboard"

pnpm --filter web build



echo "[5] Save"

git add .

git commit -m "Add dashboard v2 intelligence panels" || true

git push origin main || true


echo "======================================"
echo " DASHBOARD V2 COMPLETE"
echo ""
echo "Run:"
echo "./router restart"
echo "======================================"

