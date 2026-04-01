import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = { width: 1200, height: 630 }

export const contentType = "image/png"

export default function ConfigureTwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #3730a3 50%, #4f46e5 100%)",
          padding: 80,
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
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.72)",
                letterSpacing: 0.5,
              }}
            >
              Configureer je pakket
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.05,
              }}
            >
              AI-agent configurator
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.25,
                maxWidth: 960,
              }}
            >
              Kies pakket, add-ons en zie direct een prijsindicatie
            </div>
            <div
              style={{
                fontSize: 21,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.35,
                maxWidth: 900,
              }}
            >
              Definitieve scope bepalen we tijdens de intake - binnen 1 werkdag reactie
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
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
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "rgba(255, 255, 255, 0.18)",
                  border: "1px solid rgba(255, 255, 255, 0.26)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                Y
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ opacity: 0.9 }}>youraiworker.nl</div>
                <div style={{ fontSize: 16, opacity: 0.75 }}>Vanaf EUR 1.000 (excl. btw)</div>
              </div>
            </div>

            <div
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Ook beschikbaar: SLA en uitgebreid support
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
