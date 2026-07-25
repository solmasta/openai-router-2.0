import { useEffect, useState } from "react"
import { getDashboardData } from "./api/router"
import { executeRouter } from "./api/execute"
import "./App.css"
import Chat from "./components/Chat"
import History from "./components/History"
import ProviderControl from "./components/ProviderControl"

type Dashboard = Awaited<ReturnType<typeof getDashboardData>>

function App() {
  const [data, setData] = useState<Dashboard | null>(null)
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState<string>("")

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(console.error)
  }, [])

  async function sendMessage() {
    if (!message.trim()) return

    const result = await executeRouter(message)

    setResponse(result.response || JSON.stringify(result))
    setMessage("")
  }

  return (
    <main className="dashboard">
      <header>
        <h1>OpenAI Router 2.0</h1>
        <p>AI routing control center</p>
      </header>

      <section className="cards">

        <div className="card">
          <h2>Router</h2>
          <p>
            Status: {data?.router.online ? "Online" : "Offline"}
          </p>
          <p>
            Service: {data?.router.service ?? "loading"}
          </p>
        </div>

        <div className="card">
          <h2>Agent</h2>
          <p>
            Status: {data?.agent.online ? "Online" : "Offline"}
          </p>
          <p>
            Agent: {data?.agent.agent ?? "loading"}
          </p>
        </div>

        <div className="card">
          <h2>Providers</h2>
          {data?.providers.map((provider) => (
            <p key={provider.id}>
              {provider.name}: {provider.status}
            </p>
          ))}
        </div>

      </section>

      <Chat />

      <History />

      <ProviderControl />

      <section className="card executor">
        <h2>Router Console</h2>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message to the router..."
        />

        <button onClick={sendMessage}>
          Execute
        </button>

        {response && (
          <p>
            Response: {response}
          </p>
        )}
      </section>

      <Chat />

      <History />

      <ProviderControl />

    </main>
  )
}

export default App
