import type { ModelProvider } from "@openai-router/types"

export function getProviders(): ModelProvider[] {
  return [
    {
      id: "local",
      name: "Local Provider",
      status: "online",
    }
  ]
}

export function getProvider(id: string) {
  return getProviders().find(
    provider => provider.id === id
  )
}
