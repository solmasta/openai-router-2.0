export const ROUTER_API_KEY =
  import.meta.env.VITE_ROUTER_API_KEY ||
  "dev-router-key"


export function authHeaders() {
  return {
    "X-API-Key": ROUTER_API_KEY
  }
}
