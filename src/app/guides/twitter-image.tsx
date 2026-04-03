import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 600 }
export const contentType = "image/png"

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          padding: 70,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 2,
                color: "rgba(255, 255, 255, 0.7)",
                textTransform: "uppercase",
              }}
            >
              Handleidingen
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.1,
                maxWidth: 960,
              }}
            >
              Praktische guides voor AI-agents
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.3,
                maxWidth: 880,
              }}
            >
              Scope, approvals, testen, security en go-live
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(255, 255, 255, 0.18)",
                border: "1px solid rgba(255, 255, 255, 0.26)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              Y
            </div>
            <div>youraiworker.nl</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
