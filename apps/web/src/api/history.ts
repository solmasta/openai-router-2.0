const API_URL =
  import.meta.env.VITE_ROUTER_API_URL ||
  "http://127.0.0.1:8000"


export type HistoryItem = {
  time: string
  message: string
  provider: string
  response: string
}


export async function getHistory(): Promise<HistoryItem[]> {

  const response =
    await fetch(
      `${API_URL}/history`
    )

  return response.json()
}
