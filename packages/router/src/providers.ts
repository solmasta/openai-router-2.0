import type { ModelProvider } from '@openai-router/types'

export function getProviders(): ModelProvider[] {
  return [
    {
      id: 'local',
      name: 'Local Provider',
      status: 'online',
    },
  ]
}
