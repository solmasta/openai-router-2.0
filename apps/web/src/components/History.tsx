import {
  useEffect,
  useState
} from "react"

import {
  getHistory
} from "../api/history"

import type {
  HistoryItem
} from "../api/history"

import Tooltip from "./Tooltip"


export default function History() {

  const [items, setItems] =
    useState<HistoryItem[]>([])


  useEffect(() => {

    getHistory()
      .then(setItems)
      .catch(console.error)

  }, [])


  return (
    <div className="card">

      <h2>
        Router History
        <Tooltip text="Past requests sent through the router, newest first. This loads once when the page opens - refresh the page to see requests sent since then." />
      </h2>

      {items.length === 0 && (
        <p>
          No executions yet
        </p>
      )}

      {items
        .slice()
        .reverse()
        .map((item, index) => (

          <div key={index}>

            <strong>
              {item.provider}
            </strong>

            <p>
              {item.message}
            </p>

            <small>
              {item.response}
            </small>

          </div>

        ))}

    </div>
  )
}
