import {
  useState
} from "react"

import {
  executeRouter
} from "../api/execute"

const providers = [
  {
    id: "auto",
    name: "🚀 Auto Routing",
    description: "Router selects the healthiest available provider."
  },
  {
    id: "local",
    name: "🟢 Local Provider",
    description: "Runs requests through the local router backend."
  },
  {
    id: "mock",
    name: "Mock Provider",
    description: "Testing provider for development and debugging."
  },
  {
    id: "openai",
    name: "OpenAI Provider",
    description: "External AI provider integration."
  }
]

export default function ProviderControl() {

  const [provider, setProvider] =
    useState("local")

  const [message, setMessage] =
    useState("")

  const [result, setResult] =
    useState("")

  const [route, setRoute] =
    useState("")


  async function run() {

    const response =
      await executeRouter(
        message,
        provider
      )

    setResult(
      response.response ||
      response.error ||
      ""
    )

    setRoute(
      response.route
        ? `Mode: ${response.route} | Provider: ${response.provider}`
        : ""
    )
  }


  const selected =
    providers.find(
      p => p.id === provider
    )


  return (
    <div className="card">

      <h2>
        Provider Control
      </h2>

      <p>
        Select which AI backend receives your test request.
      </p>


      <select
        value={provider}
        onChange={
          e => setProvider(e.target.value)
        }
      >

        {providers.map(
          p => (
            <option
              key={p.id}
              value={p.id}
            >
              {p.name}
            </option>
          )
        )}

      </select>


      <p>
        {selected?.description}
      </p>


      <input
        value={message}
        onChange={
          e => setMessage(e.target.value)
        }
        placeholder="Test router message..."
      />


      <button onClick={run}>
        Send Test Request
      </button>


      <p>
        {route}
      </p>

      <pre>
        {result}
      </pre>

    </div>
  )
}
