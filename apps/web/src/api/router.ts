import type { RouterStatus, ModelProvider } from '@openai-router/types'
import { getStatus, getProviders } from '@openai-router/router'

export function fetchRouterStatus(): RouterStatus {
  return getStatus()
}

export function fetchProviders(): ModelProvider[] {
  return getProviders()
}
