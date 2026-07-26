import {useEffect,useState} from "react"


export default function RouterIntelligence(){

const [data,setData]=useState<any>({})


useEffect(()=>{

const load=()=>{

fetch(
"http://127.0.0.1:8000/intelligence"
)
.then(r=>r.json())
.then(setData)

}

load()

const t=setInterval(load,5000)

return ()=>clearInterval(t)

},[])


return (

<div className="card">

<h2>
Router Intelligence
</h2>

<pre>
{JSON.stringify(data,null,2)}
</pre>

</div>

)

}
