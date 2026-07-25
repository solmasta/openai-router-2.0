import { authHeaders } from "./session"

const API_URL =
  import.meta.env.VITE_ROUTER_API_URL ||
  "http://127.0.0.1:8000"

export async function streamRouter(
  message: string,
  onChunk: (text: string) => void
) {
  const response = await fetch(
    `${API_URL}/execute/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders()
      } as HeadersInit,
      body: JSON.stringify({
        message,
        provider: "local"
      })
    }
  )

  if (!response.body) {
    throw new Error("No stream returned")
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } =
      await reader.read()

    if (done) break

    onChunk(
      decoder.decode(value)
    )
  }
}
