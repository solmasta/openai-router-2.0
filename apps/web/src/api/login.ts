import {
  API_URL
} from "./client"

import {
  setToken
} from "./session"


export async function login(
  username: string,
  password: string
) {

  const response =
    await fetch(
      `${API_URL}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    )


  const data =
    await response.json()


  if (data.token) {
    setToken(data.token)
  }


  return data
}
