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
<Tooltip text="The router's internal ranking for this provider - higher means it's preferred for Auto Routing." />
</p>


<p>
Latency: {Number(value.latency).toFixed(3)}s
<Tooltip text="Average response time for this provider, in seconds. Lower latency raises its score." />
</p>

</div>

)

)
}

</div>

)

}
