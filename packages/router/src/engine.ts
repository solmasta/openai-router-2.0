import { getProvider } from "./providers"

export async function executeRoute(
  message: string,
  providerId = "local"
) {
  const provider = getProvider(providerId)

  if (!provider) {
    throw new Error(
      `Provider ${providerId} unavailable`
    )
  }

  return {
    provider: provider.id,
    response: `Local provider response: ${message}`
  }
}
