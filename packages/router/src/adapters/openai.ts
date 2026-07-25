export type OpenAIConfig = {
  apiKey?: string
  baseUrl: string
  model: string
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


export function getOpenAIConfig(): OpenAIConfig {
  return {
    apiKey: getEnv(
      "OPENAI_API_KEY"
    ),

    baseUrl:
      getEnv(
        "OPENAI_BASE_URL"
      ) ||
      "https://api.openai.com/v1",

    model:
      getEnv(
        "OPENAI_MODEL"
      ) ||
      "gpt-4o-mini"
  }
}


export async function openAIExecute(
  message: string
) {
  const config = getOpenAIConfig()

  if (!config.apiKey) {
    return {
      provider: "openai",
      response:
        "OpenAI provider configured but API key missing"
    }
  }


  const response = await fetch(
    `${config.baseUrl}/chat/completions`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${config.apiKey}`
      },

      body: JSON.stringify({
        model: config.model,

        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    }
  )


  const data =
    await response.json()


  return {
    provider: "openai",
    response:
      data.choices?.[0]?.message?.content ||
      "No response"
  }
}
