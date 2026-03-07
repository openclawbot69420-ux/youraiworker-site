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

  return (
    <script
      type="application/ld+json"
      // Reduce HTML escaping for JSON-LD (keeps the output readable for crawlers and debugging).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  )
}
