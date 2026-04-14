import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 600,
}

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
          padding: 72,
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
              FAQ
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.1,
                maxWidth: 960,
              }}
            >
              Veelgestelde vragen over AI-agents
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.3,
                maxWidth: 880,
              }}
            >
              Implementatie, security, doorlooptijd en integraties
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: 20,
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
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ opacity: 0.9 }}>youraiworker.nl</div>
                <div style={{ fontSize: 15, opacity: 0.75 }}>Binnen 3-10 werkdagen live</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
