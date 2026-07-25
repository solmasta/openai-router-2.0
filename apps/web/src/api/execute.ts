const API_URL =
  import.meta.env.VITE_ROUTER_API_URL ||
  "http://127.0.0.1:8000"


export type ExecuteResponse = {
  success: boolean
  provider?: string
  response?: string
  error?: string
}


export async function executeRouter(
  message: string,
  provider?: string
): Promise<ExecuteResponse> {

  const response =
    await fetch(
      `${API_URL}/execute`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          message,
          provider
        })
      }
    )

  return response.json()
}
