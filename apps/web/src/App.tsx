import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>OpenAI Router 2.0</h1>
        <p>AI routing control center</p>
      </header>

      <section className="card">
        <h2>System Status</h2>
        <p>Router: Offline</p>
        <p>Agent: Not Connected</p>
      </section>

      <section className="card">
        <h2>Models</h2>
        <ul>
          <li>OpenAI Models</li>
          <li>Local Models</li>
          <li>Custom Providers</li>
        </ul>
      </section>

      <section className="card">
        <h2>Agent Console</h2>
        <p>
          Python agent integration will connect here.
        </p>
      </section>
    </div>
  )
}

export default App
