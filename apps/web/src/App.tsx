
import {
  useRouterRefresh
} from "./hooks/useRouterRefresh"

import "./App.css"

import Chat from "./components/Chat"
import History from "./components/History"
import ProviderControl from "./components/ProviderControl"
import Metrics from "./components/Metrics"
import InsightCard from "./components/InsightCard"



function App() {

  const data =
    useRouterRefresh(5000)

  return (
    <main className="dashboard">

      <header className="hero">
        <h1>
          OpenAI Router 2.0
        </h1>

        <p>
          AI routing control center
        </p>

        <p className="description">
          Manage AI providers, test routing,
          monitor agents, and observe system health
          from one dashboard.
        </p>
      </header>


      <section className="cards">

        <InsightCard
          title="Router"
          description="The router decides where AI requests are sent. It manages provider selection and request flow."
        >
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
        </InsightCard>


        <InsightCard
          title="Agent"
          description="Agents are automated workers that execute tasks through the routing system."
        >
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
        </InsightCard>


        <InsightCard
          title="Providers"
          description="Providers are AI backends available to handle requests."
        >
          {data?.providers?.length
            ? data.providers.map(
                provider => (
                  <p key={provider.id}>
                    {provider.name}
                    {" "}
                    -
                    {" "}
                    {provider.status}
                  </p>
                )
              )
            :
              <p>
                No providers detected
              </p>
          }
        </InsightCard>

      </section>


      <InsightCard
        title="Router Chat"
        description="Send a test request through the router to verify your AI pipeline."
      >
        <Chat />
      </InsightCard>


      <InsightCard
        title="Execution History"
        description="Review previous requests and responses for debugging and auditing."
      >
        <History />
      </InsightCard>


      <InsightCard
        title="Provider Control"
        description="Choose which AI provider receives a test request."
      >
        <ProviderControl />
      </InsightCard>


      <InsightCard
        title="Metrics"
        description="Monitor usage, uptime, and system activity."
      >
        <Metrics />
      </InsightCard>


    </main>
  )
}

export default App
