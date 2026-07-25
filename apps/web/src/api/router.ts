const API_URL =
  import.meta.env.VITE_ROUTER_API || "http://127.0.0.1:8000"

export async function routerStatus() {
  const [status, providers, agent] = await Promise.all([
    fetch(`${API_URL}/status`).then(r => r.json()),
    fetch(`${API_URL}/providers`).then(r => r.json()),
    fetch(`${API_URL}/agent`).then(r => r.json()),
  ])

  return {
    router: status,
    providers,
    agent,
  }
}
