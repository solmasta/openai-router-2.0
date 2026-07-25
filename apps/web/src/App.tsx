import { useEffect, useState } from 'react'
import { routerStatus } from './api/router'
import './App.css'

type Dashboard = {
  router: {
    online: boolean
    activeProvider?: string
  }
  providers: Array<{
    id: string
    name: string
    status: string
  }>
  agent: {
    online: boolean
    agent: string
  }
}

function App() {
  const [data, setData] = useState<Dashboard | null>(null)

  useEffect(() => {
    routerStatus().then(setData).catch(console.error)
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
            Status:{' '}
            <strong>
              {data?.router.online ? 'Online' : 'Offline'}
            </strong>
          </p>
          <p>
            Provider: {data?.router.activeProvider ?? 'loading'}
          </p>
        </div>

        <div className="card">
          <h2>Agent</h2>
          <p>
            Status:{' '}
            <strong>
              {data?.agent.online ? 'Online' : 'Offline'}
            </strong>
          </p>
          <p>
            Name: {data?.agent.agent ?? 'loading'}
          </p>
        </div>

        <div className="card">
          <h2>Providers</h2>
          {data?.providers.map((provider) => (
            <div key={provider.id}>
              {provider.name}: {provider.status}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
