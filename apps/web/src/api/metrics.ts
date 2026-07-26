import { authHeaders } from "./session"

const API_URL =
  import.meta.env.VITE_ROUTER_API_URL ||
  "http://127.0.0.1:8000"


export type Metrics = {
  requests: number
  uptime_seconds: number
  providers: Record<string, number>
}


export async function getMetrics(): Promise<Metrics> {

  const response =
    await fetch(
      `${API_URL}/metrics`,
      {
        headers: {
          ...authHeaders()
        }
      }
    )

  return response.json()
}
