import { authHeaders } from "./session"

const API_URL =
  import.meta.env.VITE_ROUTER_API_URL ||
  "http://127.0.0.1:8000"

export async function executeRouter(message: string) {

  const response = await fetch(
    `${API_URL}/execute`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders()
      } as HeadersInit,
      body: JSON.stringify({
        message
      })
    }
  )

  return response.json()
}
