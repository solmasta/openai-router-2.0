import {
  routeMessage
} from "./routing"

import {
  getStatus
} from "./status"

import {
  getProviders
} from "./providers"


export async function routerExecute(
  message: string
) {
  return routeMessage(message)
}


export function routerInfo() {
  return {
    status: getStatus(),
    providers: getProviders()
  }
}
