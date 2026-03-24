const SITE_URL = "https://youraiworker.nl"

type FaqItem = { question: string; answer: string; id?: string }

export const buildFaqJsonLd = (items: FaqItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      ...(item.id ? { url: `${SITE_URL}/faq#${item.id}` } : {}),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
