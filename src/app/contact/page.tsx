import type { Metadata } from "next"

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

      <form
        action="https://formsubmit.co/Openclawbot69420@gmail.com"
        method="POST"
        className="mt-10 space-y-6"
      >
        {/* FormSubmit config */}
        <input type="hidden" name="_subject" value="Nieuwe aanvraag via youraiworker.nl" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://youraiworker.nl/contact?success=true" />
        <input type="text" name="_honey" className="hidden" />

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Naam
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700">
            Bedrijf
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">
            Bericht
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
        >
          Verstuur
        </button>
      </form>
    </section>
  )
}

export default ContactPage
