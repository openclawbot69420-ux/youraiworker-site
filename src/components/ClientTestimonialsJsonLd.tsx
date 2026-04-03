// Review schema for client testimonials - enables star rating rich snippets in search results
type Testimonial = {
  quote: string
  author: string
  role: string
  industry: string
  rating: number
  highlight?: string
  avatarColor?: string
  initials?: string
}

export const buildClientTestimonialsJsonLd = (
  testimonials: Testimonial[],
  siteName: string,
  siteUrl: string
) => {
  const reviews = testimonials.map((t) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: t.author,
      jobTitle: t.role,
      worksFor: {
        "@type": "Organization",
        name: t.industry,
      },
    },
    reviewBody: t.quote,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  }))

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    review: reviews,
  }
}

type ClientTestimonialsJsonLdProps = {
  testimonials: Testimonial[]
  siteName: string
  siteUrl: string
}

export const ClientTestimonialsJsonLd: React.FC<ClientTestimonialsJsonLdProps> = ({
  testimonials,
  siteName,
  siteUrl,
}) => {
  if (!testimonials.length) return null

  const jsonLd = buildClientTestimonialsJsonLd(testimonials, siteName, siteUrl)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  )
}
