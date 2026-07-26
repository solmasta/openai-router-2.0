import {
useEffect,
useState
} from "react"

import Tooltip from "./Tooltip"


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
<Tooltip text="Every AI backend the router is configured to use and whether it's currently reachable. Compare against Provider Control above to actually test one." />
</h2>

<p className="description">
Live availability of each configured AI backend.
</p>

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
