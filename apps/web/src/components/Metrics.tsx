import {
  useEffect,
  useState
} from "react"

import {
  getMetrics
} from "../api/metrics"

import type {
  Metrics
} from "../api/metrics"

import Tooltip from "./Tooltip"


export default function MetricsCard() {

  const [metrics, setMetrics] =
    useState<Metrics | null>(null)


  useEffect(() => {

    getMetrics()
      .then(setMetrics)
      .catch(console.error)

    const timer =
      setInterval(
        () =>
          getMetrics()
            .then(setMetrics),
        5000
      )


    return () =>
      clearInterval(timer)

  }, [])


  return (
    <div className="card">

      <h2>
        Metrics
      </h2>

      <p title="Total requests the router has handled since it last started, across all providers.">
        Requests:
        {" "}
        {metrics?.requests ?? 0}
      </p>

      <p title="How long the router process has been running without a restart.">
        Uptime:
        {" "}
        {Math.round(
          metrics?.uptime_seconds ?? 0
        )}
        s
      </p>


      <h3>
        Providers
        <Tooltip text="How many of the requests above were handled by each provider." />
      </h3>

      {Object.entries(
        metrics?.providers ?? {}
      ).map(
        ([name, count]) => (

          <p key={name}>
            {name}: {count}
          </p>

        )
      )}

    </div>
  )
}
