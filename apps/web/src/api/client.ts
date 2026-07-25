const API_URL =
  import.meta.env.VITE_ROUTER_API_URL ||
  "http://127.0.0.1:8000"


const API_KEY =
  import.meta.env.VITE_ROUTER_API_KEY ||
  "dev-router-key"


export async function apiGet<T>(
  path: string
): Promise<T> {

  const response =
    await fetch(
      `${API_URL}${path}`,
      {
        headers: {
          "X-API-Key": API_KEY
        }
      }
    )


  if (!response.ok) {
    throw new Error(
      `API error: ${response.status}`
    )
  }


  return response.json()
}


export {
  API_URL,
  API_KEY
}
