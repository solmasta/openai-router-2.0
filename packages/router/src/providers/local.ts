import type { Provider } from "./types"

export const localProvider: Provider = {
  id: "local",
  name: "Local Provider",
  status: "online",

  async execute(message: string) {
    return `Local provider response: ${message}`
  }
}
