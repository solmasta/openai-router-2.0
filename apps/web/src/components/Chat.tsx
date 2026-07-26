import {
  useState
} from "react"

import {
  streamRouter
} from "../api/stream"

import Tooltip from "./Tooltip"


export default function Chat() {

  const [message, setMessage] =
    useState("")

  const [response, setResponse] =
    useState("")

  const [status, setStatus] =
    useState("")

  const [running, setRunning] =
    useState(false)


  async function send() {

    if (!message.trim()) {
      return
    }

    setResponse("")
    setStatus("🟢 Streaming response...")
    setRunning(true)

    try {

      await streamRouter(
        message,
        chunk => {
          setResponse(
            current =>
              current + chunk
          )
        }
      )

      setStatus("✅ Complete")

    } catch (error) {

      setStatus("❌ Error")

      setResponse(
        String(error)
      )

    } finally {

      setRunning(false)

    }
  }


  return (
    <div className="card">

      <h2>
        Router Chat
        <Tooltip text="Always streams through the local provider - it doesn't let you pick one. Use Provider Control instead to test a specific provider." />
      </h2>

      <p>
        Send a request through the router
        and watch the response arrive live.
      </p>


      <input
        value={message}
        onChange={
          e => setMessage(
            e.target.value
          )
        }
        placeholder="Send request..."
      />


      <button
        onClick={send}
        disabled={running}
      >
        {running
          ? "Running..."
          : "Execute"}
      </button>


      <p>
        {status}
      </p>


      <pre>
        {response}
      </pre>

    </div>
  )
}
