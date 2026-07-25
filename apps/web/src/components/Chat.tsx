import { useState } from "react"
import { executeRouter } from "../api/execute"

export default function Chat() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")

  async function send() {
    try {
      const result = await executeRouter(message)

      setResponse(
        result.response ||
        result.error ||
        "No response"
      )
    } catch (error) {
      setResponse(
        String(error)
      )
    }
  }

  return (
    <div className="card">
      <h2>Router Chat</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a router request"
      />

      <button onClick={send}>
        Execute
      </button>

      <p>
        {response}
      </p>
    </div>
  )
}
