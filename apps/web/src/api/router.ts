import type { RouterStatus, ModelProvider } from '@openai-router/types'
import { getRouterStatus, listProviders } from '@openai-router/router'

export function fetchRouterStatus(): RouterStatus {
  return getRouterStatus()
}

export function fetchProviders(): ModelProvider[] {
  return listProviders()
}
