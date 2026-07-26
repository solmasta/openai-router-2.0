const KEY =
  "router_session"


export function setToken(
  token: string
) {
  localStorage.setItem(
    KEY,
    token
  )
}


export function getToken() {

  return localStorage.getItem(
    KEY
  )
}


export function clearToken() {

  localStorage.removeItem(
    KEY
  )
}


export function authHeaders(): Record<string, string> {

  const token =
    getToken()

  return token
    ? {
        Authorization:
          `Bearer ${token}`
      }
    : {}
}
