import { fetchProviders, fetchRouterStatus } from './api/router'
import './App.css'

function App() {
  const router = fetchRouterStatus()
  const providers = fetchProviders()

  return (
    <main className="app">
      <header className="header">
        <h1>OpenAI Router 2.0</h1>
        <p>AI infrastructure dashboard</p>
      </header>

      <section className="card">
        <h2>Router</h2>
        <p>
          Status: {router.online ? 'Online' : 'Offline'}
        </p>
        <p>
          Provider: {router.activeProvider ?? 'None'}
        </p>
      </section>

      <section className="card">
        <h2>Available Providers</h2>

        {providers.length === 0 ? (
          <p>No providers configured</p>
        ) : (
          <ul>
            {providers.map((provider) => (
              <li key={provider.id}>
                {provider.name} ({provider.status})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Agent</h2>
        <p>Agent interface ready for connection.</p>
      </section>
    </main>
  )
}

export default App
