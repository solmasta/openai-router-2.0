import {
 useEffect,
 useState
} from "react"

import {
 getEvents
} from "../api/events"


export default function ActivityFeed(){

const [events,setEvents] =
useState<any[]>([])


useEffect(()=>{

const refresh = () =>
 getEvents()
 .then(setEvents)
 .catch(()=>{})


refresh()


const timer =
setInterval(
 refresh,
 5000
)


return ()=>clearInterval(timer)


},[])


return (

<div className="card">

<h2>
Activity Feed
</h2>


{
events
.slice()
.reverse()
.map(
(event,index)=>(

<div key={index}>

<p>
{event.time}
</p>

<strong>
{event.event}
</strong>

<p>
{JSON.stringify(event.data)}
</p>

</div>

)

)
}

</div>

)

}
