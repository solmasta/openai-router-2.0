export interface AgentStatus {
  online: boolean
  agent: string
}

export async function getAgentStatus(): Promise<AgentStatus> {
  return {
    online: true,
    agent: 'assistant',
  }
}
