import type { NextResponse } from "next/server"
import { NextResponse as NextResponseImpl } from "next/server"

/**
 * Health check endpoint for uptime monitoring and status dashboards.
 * Returns 200 OK with build info when healthy.
 * Used by: UptimeRobot, Statuspage, Pingdom, etc.
 */
export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function GET(): Promise<NextResponse> {
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString()
  const gitSha = process.env.NEXT_PUBLIC_GIT_SHA?.slice(0, 7) || "unknown"
  const gitBranch = process.env.NEXT_PUBLIC_GIT_BRANCH || "unknown"

  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    build: {
      date: buildDate,
      commit: gitSha,
      branch: gitBranch,
    },
    uptime: {
      region: process.env.VERCEL_REGION || "unknown",
    },
    service: {
      name: "youraiworker-site",
      version: "1.0.0",
    },
  }

  return NextResponseImpl.json(health, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
}

/**
 * HEAD request for lightweight health checks.
 * Returns 204 No Content if healthy (minimal bandwidth).
 */
export async function HEAD(): Promise<NextResponse> {
  return NextResponseImpl.json({ status: "healthy" }, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
