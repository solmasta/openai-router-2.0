import {
  useEffect,
  useState
} from "react"

import {
  getLiveEvents
} from "../api/live"

import Tooltip from "./Tooltip"


export default function LiveMonitor(){

const [events,setEvents] =
useState<any[]>([])


useEffect(()=>{

const update = () => {

 getLiveEvents()
 .then(setEvents)
 .catch(()=>{})

}


update()


const timer =
setInterval(
 update,
 3000
)


return () =>
clearInterval(timer)


},[])


return (

<div className="card">

<h2>
Live Router Monitor
<Tooltip text="Same idea as the Activity Feed above, but polled every 3 seconds for a closer-to-real-time view." />
</h2>


{
events
.slice()
.reverse()
.map(
(event,index)=>(

<div key={index}>

<strong>
{event.event}
</strong>

<p>
{event.time}
</p>

<small>
{JSON.stringify(event.payload)}
</small>

<hr />

</div>

)

)
}

</div>

)

}
