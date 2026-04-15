import { ImageResponse } from "next/og"

export const alt = "Nieuwsbrief - Praktische AI-agent updates | Your AI Worker"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 64,
        }}
      >
        {/* Logo / Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#94a3b8",
            }}
          >
            Your AI Worker
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(6, 182, 212, 0.15)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            style={{ marginRight: 8 }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#22d3ee",
            }}
          >
            Bi-wekelijkse updates
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 20,
          }}
        >
          Praktische AI-agent tips
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: "#94a3b8",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Use-cases, implementatietips en lessons learned uit productie
        </p>

        {/* Bottom trust badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 48,
            padding: "12px 20px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10b981",
              marginRight: 12,
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#cbd5e1",
            }}
          >
            Geen spam. Uitschrijven wanneer je wilt.
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
