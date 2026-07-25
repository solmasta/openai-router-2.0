import type { RouterStatus, ModelProvider } from '@openai-router/types'

export function getRouterStatus(): RouterStatus {
  return {
    online: true,
    activeProvider: 'local'
  }
}

export function listProviders(): ModelProvider[] {
  return [
    {
      id: 'local',
      name: 'Local Model',
      status: 'online'
    }
  ]
}
