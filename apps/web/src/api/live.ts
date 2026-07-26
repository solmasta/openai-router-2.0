const API =
 import.meta.env.VITE_ROUTER_API_URL ||
 "http://127.0.0.1:8000"


export async function getLiveEvents(){

 const r =
 await fetch(
  `${API}/live-events`
 )

 return r.json()

}
