type FaqItem = {
  question: string
  answer: string
}

export const FaqJsonLd: React.FC<{ items: FaqItem[] }> = (props) => {
  const { items } = props

  if (!items.length) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      // Escape "<" to avoid ending the script tag in rare cases.
      dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
    />
  )
}
