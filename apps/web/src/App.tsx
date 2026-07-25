import { useState } from "react"

import {
  useRouterRefresh
} from "./hooks/useRouterRefresh"

import "./App.css"
import Login from "./components/Login"

import { getToken, clearToken } from "./api/session"

import Chat from "./components/Chat"
import History from "./components/History"
import ProviderControl from "./components/ProviderControl"
import Metrics from "./components/Metrics"


function App() {

  const [authenticated, setAuthenticated] =
    useState(
      Boolean(getToken())
    )

  const data =
    useRouterRefresh(5000)

  if (!authenticated) {
    return (
      <Login
        onLogin={() =>
          setAuthenticated(true)
        }
      />
    )
  }


  return (

    <main className="dashboard">

      <header>
        <h1>
          OpenAI Router 2.0
        </h1>

        <p>
          AI routing control center
        </p>
      </header>


      <section className="cards">

        <div className="card">

          <h2>
            Router
          </h2>

          <p>
            Status:
            {" "}
            {data?.router.online
              ? "Online"
              : "Offline"}
          </p>

          <p>
            Service:
            {" "}
            {data?.router.service ??
              "loading"}
          </p>

        </div>


        <div className="card">

          <h2>
            Agent
          </h2>

          <p>
            Status:
            {" "}
            {data?.agent.online
              ? "Online"
              : "Offline"}
          </p>

          <p>
            Agent:
            {" "}
            {data?.agent.agent ??
              "loading"}
          </p>

        </div>


        <div className="card">

          <h2>
            Providers
          </h2>

          {data?.providers.map(
            (provider) => (

              <p key={provider.id}>
                {provider.name}
                :
                {" "}
                {provider.status}
              </p>

            )
          )}

        </div>

      </section>


      <Chat />

      <History />

      <ProviderControl />

      <Metrics />

    <button
        onClick={() => {
          clearToken()
          setAuthenticated(false)
        }}
      >
        Logout
      </button>

    </main>
  )
}


export default App
