
type Props = {
  title: string
  description: string
  children?: React.ReactNode
}

export default function InsightCard({
  title,
  description,
  children
}: Props) {
  return (
    <div className="card insight-card">
      <h2>{title}</h2>
      <p className="description">
        {description}
      </p>
      {children}
    </div>
  )
}
