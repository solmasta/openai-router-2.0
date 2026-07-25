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

      <p>
        Requests:
        {" "}
        {metrics?.requests ?? 0}
      </p>

      <p>
        Uptime:
        {" "}
        {Math.round(
          metrics?.uptime_seconds ?? 0
        )}
        s
      </p>


      <h3>
        Providers
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
