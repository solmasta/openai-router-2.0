import { executeRoute } from "./engine"

export async function execute(
  message: string
) {
  return executeRoute(message)
}
