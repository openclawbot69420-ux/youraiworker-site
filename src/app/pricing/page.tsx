import type { Metadata } from "next"

import { Builder } from "./Builder"

export const metadata: Metadata = {
  title: "Prijzen",
  description: "Kies een package en add-ons voor AI-agents. Builder-first overzicht met intakeflow.",
  alternates: {
    canonical: "https://youraiworker.nl/pricing",
  },
  openGraph: {
    title: "Prijzen voor AI-agents | Your AI Worker",
    description: "Builder-first pricing met Starter, Groei en add-ons voor implementatie en provisioning.",
    url: "https://youraiworker.nl/pricing",
    images: [
      {
        url: "/og.png",
        alt: "Your AI Worker prijzen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prijzen AI-agents | Your AI Worker",
    description: "Stel package en add-ons samen en start direct een intake.",
    images: ["/og.png"],
  },
}

const PricingPage = () => {
  return <Builder />
}

export default PricingPage
