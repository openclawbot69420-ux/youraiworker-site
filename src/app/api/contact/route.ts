import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 })
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing env vars:", {
        hasUser: !!process.env.GMAIL_USER,
        hasPass: !!process.env.GMAIL_APP_PASSWORD,
      })
      return NextResponse.json({ error: "Server configuratie fout.", debug: "missing_env" }, { status: 500 })
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
      text: `Naam: ${name}\nE-mail: ${email}\nBedrijf: ${company || "–"}\n\nBericht:\n${message}`,
      html: `
        <h2>Nieuwe aanvraag via youraiworker.nl</h2>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Naam</td><td>${name}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">E-mail</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Bedrijf</td><td>${company || "–"}</td></tr>
        </table>
        <h3>Bericht</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    console.error("Contact form error:", msg)
    return NextResponse.json({ error: "Er ging iets mis bij het versturen.", debug: msg }, { status: 500 })
  }
}
