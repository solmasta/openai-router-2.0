import {useEffect,useState} from "react"


export default function ControlPlane(){

const [data,setData]=useState<any>({})


useEffect(()=>{

fetch(
"http://127.0.0.1:8000/status"
)
.then(r=>r.json())
.then(setData)

},[])


return (

<div className="card">

<h2>
AI Control Plane
</h2>

<pre>
{JSON.stringify(data,null,2)}
</pre>

</div>

)

}
