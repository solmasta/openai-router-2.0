import {useEffect,useState} from "react"

import {
 routerStatus,
 routerInfo,
 getProviders,
 getMetrics
} from "../api/admin"


export default function AdminPanel(){

 const [data,setData]=useState<any>({})


 async function refresh(){

   setData({
    status: await routerStatus(),
    router: await routerInfo(),
    providers: await getProviders(),
    metrics: await getMetrics()
   })

 }


 useEffect(()=>{

   refresh()

   const timer=setInterval(
    refresh,
    5000
   )

   return ()=>clearInterval(timer)

 },[])


 return (

 <div className="card">

 <h2>
 Router Admin Center
 </h2>


 <h3>
 Status
 </h3>

 <pre>
 {JSON.stringify(
   data.status,
   null,
   2
 )}
 </pre>


 <h3>
 Providers
 </h3>

 <pre>
 {JSON.stringify(
   data.providers,
   null,
   2
 )}
 </pre>


 <h3>
 Metrics
 </h3>

 <pre>
 {JSON.stringify(
   data.metrics,
   null,
   2
 )}
 </pre>


 </div>

 )

}
