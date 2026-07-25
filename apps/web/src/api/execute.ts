import { apiGet } from "./client"

export type ExecutionResult = {
  success: boolean
  route: {
    provider: string
    mode: string
    decision: string
  }
  input: string
  output: string
}

export function executeRequest(input: string) {
  return apiGet<ExecutionResult>(
    `/execute?input=${encodeURIComponent(input)}`
  )
}
