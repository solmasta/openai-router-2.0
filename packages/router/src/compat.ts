export function getProviders() {
  return [
    {
      id: "local",
      name: "Local Provider",
      status: "online",
    },
  ]
}

export function getStatus() {
  return {
    online: true,
    activeProvider: "local",
  }
}

export async function getAgentStatus() {
  return {
    online: true,
    agent: "assistant",
  }
}
