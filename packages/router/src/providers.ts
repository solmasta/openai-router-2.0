import type { ModelProvider } from "@openai-router/types"

export type RuntimeProvider = ModelProvider & {
  execute(message: string): Promise<string>
}


const providers: RuntimeProvider[] = [

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


export function getProviders(): ModelProvider[] {
  return providers.map(
    ({ id, name, status }) => ({
      id,
      name,
      status
    })
  )
}


export function getProvider(id: string) {
  return providers.find(
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
      `Provider ${id} not found`
    )
  }

  return provider.execute(message)
}
