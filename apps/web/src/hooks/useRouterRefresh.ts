import {
  useEffect,
  useState
} from "react"

import {
  getDashboardData
} from "../api/router"


export function useRouterRefresh(
  interval = 5000
) {

  const [data, setData] =
    useState<
      Awaited<
        ReturnType<
          typeof getDashboardData
        >
      > | null
    >(null)


  useEffect(() => {

    let alive = true

    async function refresh() {

      try {

        const result =
          await getDashboardData()

        if (alive) {
          setData(result)
        }

      } catch (error) {
        console.error(error)
      }
    }


    refresh()

    const timer =
      setInterval(
        refresh,
        interval
      )


    return () => {
      alive = false
      clearInterval(timer)
    }

  }, [interval])


  return data
}
