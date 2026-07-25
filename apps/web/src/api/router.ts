import {
  getStatus,
  getProviders,
  getAgentStatus,
} from '@openai-router/router'

export async function routerStatus() {
  return {
    router: getStatus(),
    providers: getProviders(),
    agent: await getAgentStatus(),
  }
}
