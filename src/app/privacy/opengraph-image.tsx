import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Privacybeleid | Your AI Worker - AVG/GDPR compliant"
export const size = { width: 1200, height: 630 }

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "white",
            }}
          >
            Your AI Worker
          </span>
        </div>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "700",
            color: "white",
            lineHeight: "1.1",
            marginBottom: "16px",
          }}
        >
          Privacybeleid
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            maxWidth: "800px",
          }}
        >
          AVG/GDPR compliant - Uw gegevens, beschermd
        </p>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              color: "#10b981",
              fontWeight: "500",
            }}
          >
            EU data residency
          </span>
          <span style={{ color: "#64748b" }}>|</span>
          <span
            style={{
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            Geen tracking, geen derden
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
