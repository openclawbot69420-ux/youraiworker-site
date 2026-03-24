import { NextResponse } from "next/server"
import { z } from "zod"

const EmailSchema = z.object({
  email: z.string().trim().email().max(254),
})

const getClientKey = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : "unknown"
  return ip || "unknown"
}

// Simple in-memory rate limiter (resets on server restart)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

const checkRateLimit = (key: string, limit: number, windowMs: number) => {
  const now = Date.now()
  const entry = rateLimit.get(key)
  
  if (!entry || now > entry.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs })
    return { ok: true }
  }
  
  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetTime - now) / 1000) }
  }
  
  entry.count++
  return { ok: true }
}

export const POST = async (request: Request) => {
  try {
    // Rate limit: 3 submissions per IP per hour
    const clientKey = getClientKey(request)
    const rl = checkRateLimit(`newsletter:${clientKey}`, 3, 60 * 60 * 1000)
    
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Te veel aanvragen. Probeer het over een uur opnieuw." },
        { status: 429 },
      )
    }

    const body = await request.json().catch(() => null)
    const parsed = EmailSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Vul een geldig e-mailadres in." },
        { status: 400 },
      )
    }

    const { email } = parsed.data

    // In a production environment, this would store to a database
    // For now, we log the subscription (can be captured by server logs)
    console.log(`[Newsletter Subscription] ${email} at ${new Date().toISOString()}`)

    // Return success - the email is captured in logs for now
    return NextResponse.json({
      success: true,
      message: "Je bent aangemeld voor updates over AI-automatisering",
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    console.error("Newsletter subscription error:", msg)
    return NextResponse.json(
      { error: "Er ging iets mis bij het aanmelden. Probeer het later opnieuw." },
      { status: 500 },
    )
  }
}
