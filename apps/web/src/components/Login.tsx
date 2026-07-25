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
  }


  return (
    <main className="dashboard">

      <div className="card">

        <h1>
          OpenAI Router Login
        </h1>


        <input
          value={username}
          onChange={
            e => setUsername(
              e.target.value
            )
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
