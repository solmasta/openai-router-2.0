import { localProvider } from "./local"
import type { Provider } from "./types"

const providers: Provider[] = [
  localProvider
]

export function listProviders() {
  return providers.map(provider => ({
    id: provider.id,
    name: provider.name,
    status: provider.status
  }))
}

export function getProvider(id: string) {
  return providers.find(
    provider => provider.id === id
  )
}
