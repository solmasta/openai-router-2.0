import { getProvider } from "./providers"

export type RouteDecision = {
  provider: string
  reason: string
}

export function selectProvider(message: string): RouteDecision {
  const text = message.toLowerCase()

  if (text.includes("local")) {
    return {
      provider: "local",
      reason: "Explicit local request"
    }
  }

  return {
    provider: "local",
    reason: "Default provider selection"
  }
}


export async function routeMessage(
  message: string
) {
  const decision = selectProvider(message)

  const provider = getProvider(
    decision.provider
  )

  if (!provider) {
    throw new Error(
      `No provider available: ${decision.provider}`
    )
  }

  return {
    provider: provider.id,
    reason: decision.reason,
    response: `Local provider response: ${message}`
  }
}
