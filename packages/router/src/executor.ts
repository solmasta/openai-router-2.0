import { routeRequest } from "./engine"
import { getProviderAdapter } from "./providers/registry"

export async function execute(input: string) {
  const provider = routeRequest()

  if (!provider) {
    throw new Error("No provider available")
  }

  const adapter = getProviderAdapter(provider.id)

  if (!adapter) {
    throw new Error("Provider adapter missing")
  }

  return adapter.execute({
    input,
  })
}
