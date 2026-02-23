"use client"

import { useState } from "react"

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-900">Bedankt voor je bericht!</p>
        <p className="mt-2 text-sm text-green-700">We reageren binnen 24 uur.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-green-700 underline hover:text-green-900"
        >
          Nog een bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Naam *
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
            E-mail *
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
          Bericht *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Er ging iets mis bij het versturen. Probeer het later opnieuw.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Versturen..." : "Verstuur"}
      </button>
    </form>
  )
}
