import {
  API_URL
} from "./client"

import {
  authHeaders
} from "./auth"


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
            "application/json",

          ...authHeaders()
        },

        body: JSON.stringify({
          message,
          provider
        })
      }
    )


  return response.json()
}
