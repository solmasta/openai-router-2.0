import {useEffect,useState} from "react"

import {
 routerStatus,
 routerInfo,
 getProviders,
 getMetrics
} from "../api/admin"

import Tooltip from "./Tooltip"


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
 <Tooltip text="Raw data straight from the router's admin API, refreshed every 5 seconds. This is meant for debugging - it's the same underlying data shown more readably in the Metrics and Providers cards." />
 </h2>


 <h3>
 Status
 <Tooltip text="Whether the router process itself is up and responding right now." />
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
 <Tooltip text="Every AI backend the router knows about and its current availability (e.g. online, offline)." />
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
 <Tooltip text="Cumulative counts of requests handled since the router started, broken down by provider." />
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
