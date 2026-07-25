export type Provider = {
  id: string
  name: string
  status: "online" | "offline"
  priority: number
}

const providers: Provider[] = [
  {
    id: "local",
    name: "Local Provider",
    status: "online",
    priority: 1,
  },
  {
    id: "backup",
    name: "Backup Provider",
    status: "offline",
    priority: 2,
  },
]

export function listProviders() {
  return providers
}

export function getProvider(id: string) {
  return providers.find((provider) => provider.id === id)
}
