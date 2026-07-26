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
