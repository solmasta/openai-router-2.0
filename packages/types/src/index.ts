export interface ModelProvider {
  id: string
  name: string
  status: 'online' | 'offline'
}

export interface RouterStatus {
  online: boolean
  activeProvider?: string
}

export interface AgentMessage {
  role: 'user' | 'assistant'
  content: string
}
