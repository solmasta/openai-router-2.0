import {useEffect,useState} from "react"

import {
 getIntelligence
} from "../api/intelligence"

import Tooltip from "./Tooltip"


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
<Tooltip text="How the router is scoring each provider to decide who gets picked next when Auto Routing is used. Higher score and lower latency make a provider more likely to be chosen." />
</h2>


{
Object.entries(data).map(
([name,value]:any)=>(

<div key={name}>

<h3>
{name}
</h3>


<p title="Total requests routed to this provider.">
Requests: {value.requests}
</p>


<p title="Requests this provider completed successfully.">
Success: {value.success}
</p>


<p title="Requests this provider failed to complete.">
Failures: {value.failure}
</p>


<p title="The router's internal ranking for this provider - higher means it's preferred for Auto Routing.">
Score: {value.score}
</p>


<p title="Average response time for this provider, in seconds.">
Latency: {Number(value.latency).toFixed(3)}s
</p>

</div>

)

)
}

</div>

)

}
