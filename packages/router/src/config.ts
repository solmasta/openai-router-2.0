export type RouterConfig = {
  localEnabled: boolean
  mockEnabled: boolean
}


function envFlag(
  value: string | undefined,
  fallback = true
): boolean {
  if (value === undefined) {
    return fallback
  }

  return value === "true"
}


function getEnv(
  key: string
): string | undefined {

  if (
    typeof globalThis !== "undefined" &&
    "process" in globalThis
  ) {
    const env =
      (globalThis as {
        process?: {
          env?: Record<string, string | undefined>
        }
      }).process?.env

    return env?.[key]
  }

  return undefined
}


export function getConfig(): RouterConfig {
  return {
    localEnabled: envFlag(
      getEnv("ROUTER_LOCAL_ENABLED")
    ),

    mockEnabled: envFlag(
      getEnv("ROUTER_MOCK_ENABLED")
    )
  }
}
