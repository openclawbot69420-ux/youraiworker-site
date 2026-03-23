type HowToStep = {
  name: string
  url: string
  description: string
}

type HowToProps = {
  name: string
  description: string
  image?: string
  steps: HowToStep[]
}

export const HowToJsonLd: React.FC<HowToProps> = (props) => {
  const { name, description, image, steps } = props
  if (!steps.length) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(image ? { image } : {}),
    totalTime: "P7D",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      url: step.url,
      description: step.description,
    })),
  }

  const toJsonLd = (value: object) =>
    JSON.stringify(value).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
    />
  )
}
