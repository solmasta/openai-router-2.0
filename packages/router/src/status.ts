import type { RouterStatus } from '@openai-router/types'

export function getStatus(): RouterStatus {
  return {
    online: true,
    activeProvider: 'local',
  }
}
