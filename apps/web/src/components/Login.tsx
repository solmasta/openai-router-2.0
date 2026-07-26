import {
  useState
} from "react"

import {
  login
} from "../api/login"


type Props = {
  onLogin: () => void
}


export default function Login({
  onLogin
}: Props) {

  const [username, setUsername] =
    useState("admin")

  const [password, setPassword] =
    useState("admin")

  const [error, setError] =
    useState("")


  async function submit() {

    setError("")

    try {

      const result =
        await login(
          username,
          password
        )

      if (result.success) {

        onLogin()

      } else {

        setError(
          result.error ||
          "Login failed"
        )

      }

    } catch {

      setError(
        "Could not reach the router backend. " +
        "Check that it's running and reachable at the configured API URL."
      )

    }
  }


  return (
    <main className="dashboard">

      <div className="card">

        <h1>
          OpenAI Router Login
        </h1>

        <p className="description">
          Sign in to send requests through the router.
          Default credentials are admin / admin unless
          ROUTER_USER / ROUTER_PASSWORD are set on the backend.
        </p>

        <input
          value={username}
          onChange={
            e => setUsername(
              e.target.value
            )
          }
          onKeyDown={
            e => e.key === "Enter" && submit()
          }
          placeholder="Username"
        />


        <input
          type="password"
          value={password}
          onChange={
            e => setPassword(
              e.target.value
            )
          }
          onKeyDown={
            e => e.key === "Enter" && submit()
          }
          placeholder="Password"
        />


        <button onClick={submit}>
          Login
        </button>


        <p>
          {error}
        </p>

      </div>

    </main>
  )
}
