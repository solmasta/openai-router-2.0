export type ProviderStatus =
  | "online"
  | "offline"

export type Provider = {
  id: string
  name: string
  status: ProviderStatus
  execute(message: string): Promise<string>
}
