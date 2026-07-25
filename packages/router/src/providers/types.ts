export type ProviderRequest = {
  input: string
}

export type ProviderResponse = {
  provider: string
  output: string
}

export interface ProviderAdapter {
  id: string
  name: string
  execute(request: ProviderRequest): Promise<ProviderResponse>
}
