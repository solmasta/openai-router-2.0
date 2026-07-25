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
