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
