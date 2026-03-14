import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #38bdf8 100%)",
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
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 58,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.05,
              }}
            >
              Your AI Worker
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: 1.2,
                maxWidth: 980,
              }}
            >
              Productierijpe AI-agents voor Nederlandse bedrijven
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.82)",
                lineHeight: 1.35,
                maxWidth: 900,
              }}
            >
              Maatwerk automatisering, veilig ingericht en binnen dagen live
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
                <div style={{ fontSize: 16, opacity: 0.75 }}>Intake in 20 minuten</div>
              </div>
            </div>

            <div
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                background: "rgba(15, 23, 42, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Security-first
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
