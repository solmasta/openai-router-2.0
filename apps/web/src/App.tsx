import { useEffect, useState } from "react"
import { getDashboardData } from "./api/router"
import "./App.css"

type Dashboard = Awaited<ReturnType<typeof getDashboardData>>

function App() {
  const [data, setData] = useState<Dashboard | null>(null)

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(console.error)
  }, [])

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
    </main>
  )
}

export default App
