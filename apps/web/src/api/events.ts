const API =
 import.meta.env.VITE_ROUTER_API_URL ||
 "http://127.0.0.1:8000"


export async function getEvents(){

 const response =
 await fetch(
  `${API}/events`
 )

 return response.json()

}
