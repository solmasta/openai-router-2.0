import {useEffect,useState} from "react"

export default function AdminPanel(){

const [data,setData]=useState<any>({})

useEffect(()=>{

fetch(
"http://127.0.0.1:8000/providers"
)
.then(r=>r.json())
.then(setData)

},[])


return (
<div className="card">

<h2>
Admin Control Center
</h2>

<pre>
{JSON.stringify(data,null,2)}
</pre>

</div>
)

}
