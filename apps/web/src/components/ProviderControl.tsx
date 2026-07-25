import {
  useState
} from "react"

import {
  executeRouter
} from "../api/execute"


export default function ProviderControl() {

  const [provider, setProvider] =
    useState("local")

  const [message, setMessage] =
    useState("")

  const [result, setResult] =
    useState("")


  async function run() {

    const response =
      await executeRouter(
        message
      )

    setResult(
      response.response ||
      response.error ||
      ""
    )
  }


  return (
    <div className="card">

      <h2>
        Provider Control
      </h2>

      <select
        value={provider}
        onChange={
          e => setProvider(e.target.value)
        }
      >
        <option value="local">
          Local
        </option>

        <option value="mock">
          Mock
        </option>

        <option value="openai">
          OpenAI
        </option>

      </select>


      <input
        value={message}
        onChange={
          e => setMessage(e.target.value)
        }
        placeholder="Message"
      />


      <button onClick={run}>
        Run
      </button>


      <p>
        {result}
      </p>

    </div>
  )
}
