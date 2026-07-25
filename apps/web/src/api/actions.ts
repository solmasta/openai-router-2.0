import { apiGet } from "./client"

export function setProvider(name: string) {
  return apiGet(`/set-provider?name=${name}`)
}

export function setMode(mode: string) {
  return apiGet(`/set-mode?mode=${mode}`)
}
