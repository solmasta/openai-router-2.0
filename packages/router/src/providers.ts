import type { ModelProvider } from "@openai-router/types"
import { getConfig } from "./config"

export type RuntimeProvider = ModelProvider & {
  execute(message: string): Promise<string>
}


const allProviders: RuntimeProvider[] = [

  {
    id: "local",
    name: "Local Provider",
    status: "online",

    async execute(message: string) {
      return `Local provider response: ${message}`
    }
  },

  {
    id: "mock",
    name: "Mock AI Provider",
    status: "online",

    async execute(message: string) {
      return `Mock provider response: ${message}`
    }
  }

]


export function getRuntimeProviders() {
  const config = getConfig()

  return allProviders.filter(provider => {
    if (
      provider.id === "local"
    ) {
      return config.localEnabled
    }

    if (
      provider.id === "mock"
    ) {
      return config.mockEnabled
    }

    return false
  })
}


export function getProviders(): ModelProvider[] {
  return getRuntimeProviders().map(
    ({ id, name, status }) => ({
      id,
      name,
      status
    })
  )
}


export function getProvider(id: string) {
  return getRuntimeProviders().find(
    provider => provider.id === id
  )
}


export async function executeProvider(
  id: string,
  message: string
) {
  const provider = getProvider(id)

  if (!provider) {
    throw new Error(
      `Provider ${id} unavailable`
    )
  }

  return provider.execute(message)
}
