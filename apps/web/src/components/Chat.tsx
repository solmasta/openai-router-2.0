import {
  useState
} from "react"

import {
  streamRouter
} from "../api/stream"


export default function Chat() {

  const [message, setMessage] =
    useState("")

  const [response, setResponse] =
    useState("")


  async function send() {

    setResponse("")

    await streamRouter(
      message,
      chunk => {
        setResponse(
          current =>
            current + chunk
        )
      }
    )
  }


  return (
    <div className="card">

      <h2>
        Router Chat
      </h2>

      <input
        value={message}
        onChange={
          e => setMessage(
            e.target.value
          )
        }
        placeholder="Send request..."
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
