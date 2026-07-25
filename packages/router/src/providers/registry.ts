import { localProvider } from "./local"
import type { ProviderAdapter } from "./types"

const providers: ProviderAdapter[] = [
  localProvider,
]

export function getProviderAdapter(id: string) {
  return providers.find(
    (provider) => provider.id === id
  )
}

export function listProviderAdapters() {
  return providers
}
