import {
 useEffect,
 useState
} from "react"

import {
 getEvents
} from "../api/events"

import Tooltip from "./Tooltip"


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
<Tooltip text="A general log of router events, newest first, polled every 5 seconds. See Live Router Monitor below for a faster-refreshing version of the same kind of feed." />
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
