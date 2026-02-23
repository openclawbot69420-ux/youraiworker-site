import type { Metadata } from "next"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op voor een vrijblijvende intake of stel je vraag.",
}

const ContactPage: React.FC = () => {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
      <p className="mt-4 text-slate-600">
        Plan een intake, stel een vraag, of vraag een voorstel aan. We reageren binnen 24 uur.
      </p>
      <ContactForm />
    </section>
  )
}

export default ContactPage
