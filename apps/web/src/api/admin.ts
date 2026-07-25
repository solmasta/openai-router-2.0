import { authHeaders } from "./session"

const API_URL =
  import.meta.env.VITE_ROUTER_API_URL ||
  "http://127.0.0.1:8000"


function headers(): HeadersInit {
  return {
    ...(authHeaders() as Record<string, string>)
  }
}


export async function routerStatus(){

  const r = await fetch(
    `${API_URL}/status`,
    {
      headers: headers()
    }
  )

  return r.json()
}


export async function routerInfo(){

  const r = await fetch(
    `${API_URL}/router`,
    {
      headers: headers()
    }
  )

  return r.json()
}


export async function getProviders(){

  const r = await fetch(
    `${API_URL}/providers`,
    {
      headers: headers()
    }
  )

  return r.json()
}


export async function getMetrics(){

  const r = await fetch(
    `${API_URL}/metrics`,
    {
      headers: headers()
    }
  )

  return r.json()
}
