import Version from "./components/Version"
import LiveMonitor from "./components/LiveMonitor"
import ActivityFeed from "./components/ActivityFeed"
import Intelligence from "./components/Intelligence"
import Providers from "./components/Providers"

import Chat from "./components/Chat"

import History from "./components/History"

import Metrics from "./components/Metrics"

import ProviderControl from "./components/ProviderControl"

import AdminPanel from "./components/AdminPanel"


function InsightCard(
  {
    title,
    description,
    children
  }: {
    title: string
    description: string
    children: React.ReactNode
  }
) {

  return (
    <section className="card">

      <h2>
        {title}
      </h2>

      <p>
        {description}
      </p>

      {children}

    </section>
  )
}


function App() {

  return (

    <main>
<Version />

      <h1>
        OpenAI Router 2.0
      </h1>


      <InsightCard
        title="Router Chat"
        description="Send requests through configured AI providers."
      >
        <Chat />
      </InsightCard>


      <InsightCard
        title="Provider Control"
        description="Select and test AI providers."
      >
        <ProviderControl />
      </InsightCard>


      <InsightCard
        title="History"
        description="Review previous router executions."
      >
        <History />
      </InsightCard>


      <InsightCard
        title="Metrics"
        description="Monitor usage, uptime, and system activity."
      >
        <Metrics />
      </InsightCard>


      <InsightCard
        title="Admin Center"
        description="Monitor router status, providers, and system health."
      >
        <AdminPanel />
      </InsightCard>


    
<Providers />

<Intelligence />


<ActivityFeed />


<LiveMonitor />

</main>




  )
}


export default App