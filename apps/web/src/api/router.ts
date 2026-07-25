import { apiGet } from "./client"

export type RouterStatus = {
  online: boolean
  service: string
}

export type Provider = {
  id: string
  name: string
  status: string
}

export type AgentStatus = {
  online: boolean
  agent: string
}


export async function getRouterStatus() {
  return apiGet<RouterStatus>("/status")
}


export async function getRouterInfo() {
  return apiGet<{
    name: string
    providers: Provider[]
  }>("/router")
}


export async function getProviders() {
  const router =
    await getRouterInfo()

  return router.providers
}


export async function getAgentStatus() {
  return {
    online: true,
    agent: "router-agent"
  }
}


export async function getDashboardData() {

  const [
    router,
    providers,
    agent
  ] = await Promise.all([
    getRouterStatus(),
    getProviders(),
    getAgentStatus()
  ])


  return {
    router,
    providers,
    agent
  }
}
