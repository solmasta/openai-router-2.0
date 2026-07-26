import { Component } from "react"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

type State = {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="card">
          <p>
            This panel failed to render: {this.state.error.message}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
