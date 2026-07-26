import { useId } from "react"

type Props = {
  text: string
}

export default function Tooltip({ text }: Props) {
  const id = useId()

  return (
    <span className="tooltip">
      <button
        type="button"
        className="tooltip-trigger"
        aria-describedby={id}
        aria-label="More info"
      >
        i
      </button>
      <span role="tooltip" id={id} className="tooltip-bubble">
        {text}
      </span>
    </span>
  )
}
