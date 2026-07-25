import type {
  ProviderAdapter,
  ProviderRequest,
  ProviderResponse,
} from "./types"

export const localProvider: ProviderAdapter = {
  id: "local",
  name: "Local Provider",

  async execute(
    request: ProviderRequest
  ): Promise<ProviderResponse> {
    return {
      provider: "local",
      output: `Local provider processed: ${request.input}`,
    }
  },
}
