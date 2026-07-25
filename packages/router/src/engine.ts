import { listProviders } from "./registry"

export function routeRequest() {
  const available = listProviders()
    .filter((provider) => provider.status === "online")
    .sort((a, b) => a.priority - b.priority)

  return available[0] ?? null
}
