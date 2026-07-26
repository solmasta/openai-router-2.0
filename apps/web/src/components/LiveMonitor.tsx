import {
  useEffect,
  useState
} from "react"

import {
  getLiveEvents
} from "../api/live"


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
