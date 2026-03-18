import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

import { rateLimit } from "./rateLimit"

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")

const ContactSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(254),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    message: z.string().trim().min(10).max(4000),
    // Honeypot: should stay empty
    website: z.string().optional().or(z.literal("")),
  })
  .strict()

const getClientKey = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : "unknown"
  return ip || "unknown"
}

export const POST = async (request: Request) => {
  try {
    // Basic abuse protection (best-effort; serverless instances may not share memory)
    const rl = rateLimit(getClientKey(request), { limit: 5, windowMs: 10 * 60 * 1000 })
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Te veel aanvragen. Probeer het later opnieuw." },
        { status: 429 },
      )
    }

    const body = await request.json().catch(() => null)
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Vul alle velden correct in." }, { status: 400 })
    }

    const { name, email, company, message, website } = parsed.data

    if (website && website.trim().length > 0) {
      // Silent accept to avoid giving spammers signal
      return NextResponse.json({ success: true })
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD")
      return NextResponse.json({ error: "Server configuratie fout." }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Your AI Worker" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nieuwe aanvraag van ${name}${company ? ` (${company})` : ""}`,
      text: `Naam: ${name}\nE-mail: ${email}\nBedrijf: ${company || "-"}\n\nBericht:\n${message}`,
      html: `
        <h2>Nieuwe aanvraag via youraiworker.nl</h2>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Naam</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">E-mail</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Bedrijf</td><td>${escapeHtml(company || "-")}</td></tr>
        </table>
        <h3>Bericht</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    console.error("Contact form error:", msg)
    return NextResponse.json({ error: "Er ging iets mis bij het versturen." }, { status: 500 })
  }
}
