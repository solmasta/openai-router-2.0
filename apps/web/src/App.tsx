import { useEffect, useState } from 'react';
import Version from './components/Version';
import LiveMonitor from './components/LiveMonitor';
import ActivityFeed from './components/ActivityFeed';
import Intelligence from './components/Intelligence';
import Providers from './components/Providers';
import Chat from './components/Chat';
import History from './components/History';
import Metrics from './components/Metrics';
import ProviderControl from './components/ProviderControl';
import AdminPanel from './components/AdminPanel';
import Tooltip from './components/Tooltip';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';
import { getToken, clearToken } from './api/session';
import { getMetrics } from './api/metrics';

function InsightCard({
  title,
  description,
  tip,
  children
}: {
  title: string;
  description: string;
  tip?: string;
  children: React.ReactNode;
}) {
  return (
    <section className='card'>
      <h2>
        {title}
        {tip && <Tooltip text={tip} />}
      </h2>
      <p className='description'>{description}</p>
      <ErrorBoundary>{children}</ErrorBoundary>
    </section>
  );
}

function App() {
  const [authed, setAuthed] = useState(() => Boolean(getToken()));

  useEffect(() => {
    if (!authed) return;

    // The backend keeps session tokens in memory only, so a backend
    // restart silently invalidates whatever token is still in
    // localStorage. Confirm it still works before trusting it.
    getMetrics().then(result => {
      if ((result as { error?: string }).error === 'unauthorized') {
        clearToken();
        setAuthed(false);
      }
    });
  }, [authed]);

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />;
  }

  return (
    <main className='dashboard'>
      <header>
        <h1>OpenAI Router 2.0</h1>
        <div>
          <Version />
          <button
            onClick={() => {
              clearToken();
              setAuthed(false);
            }}
          >
            Log out
          </button>
        </div>
      </header>
      <div className='cards'>
        <InsightCard
          title='Router Chat'
          description='Send requests through configured AI providers.'
          tip='Type a message and click Execute. The router streams the reply back live, chunk by chunk, instead of waiting for the full response.'
        >
          <Chat />
        </InsightCard>
        <InsightCard
          title='Provider Control'
          description='Select and test AI providers.'
          tip='Pick a provider from the dropdown, send a one-off test message, and see exactly which provider and mode handled it. Use this to verify a provider works before relying on Auto Routing.'
        >
          <ProviderControl />
        </InsightCard>
        <InsightCard
          title='History'
          description='Review previous router executions.'
          tip='A local log of test requests you have sent from this dashboard, most recent first: which provider handled each one and what it returned.'
        >
          <History />
        </InsightCard>
        <InsightCard
          title='Metrics'
          description='Monitor usage, uptime, and system activity.'
          tip='Live counters from the router backend: total requests served, how long the router process has been running, and a per-provider breakdown of request counts. Refreshes automatically every 5 seconds.'
        >
          <Metrics />
        </InsightCard>
        <InsightCard
          title='Admin Center'
          description='Monitor router status, providers, and system health.'
          tip='Raw diagnostic data from the router: current status, configured providers, and metrics, all in one place. Intended for debugging - see the Metrics and Providers cards for a friendlier view of the same data.'
        >
          <AdminPanel />
        </InsightCard>
      </div>
      <ErrorBoundary><Providers /></ErrorBoundary>
      <ErrorBoundary><Intelligence /></ErrorBoundary>
      <ErrorBoundary><ActivityFeed /></ErrorBoundary>
      <ErrorBoundary><LiveMonitor /></ErrorBoundary>
    </main>
  );
}

export default App;