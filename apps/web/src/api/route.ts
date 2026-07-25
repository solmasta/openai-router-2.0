import { apiGet } from "./client"

export type RouteDecision = {
  provider: string
  mode: string
  decision: string
}

export function getRoute() {
  return apiGet<RouteDecision>("/route")
}
