import {
  executeProvider
} from "./providers"


export function selectProvider(
  message: string
) {
  const text = message.toLowerCase()

  if (text.includes("mock")) {
    return {
      provider: "mock",
      reason: "Mock keyword detected"
    }
  }

  return {
    provider: "local",
    reason: "Default routing rule"
  }
}


export async function routeMessage(
  message: string
) {
  const decision = selectProvider(message)

  return {
    provider: decision.provider,
    reason: decision.reason,
    response: await executeProvider(
      decision.provider,
      message
    )
  }
}
