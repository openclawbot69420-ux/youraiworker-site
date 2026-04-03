import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 600,
}

export const contentType = "image/png"

export default function IntegrationsTwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #7c3aed 60%, #a78bfa 100%)",
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
                fontSize: 54,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.05,
              }}
            >
              Integraties
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: 1.2,
                maxWidth: 960,
              }}
            >
              Koppel je bestaande tools veilig
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.82)",
                lineHeight: 1.35,
                maxWidth: 880,
              }}
            >
              Gmail, Slack, WhatsApp, HubSpot, Salesforce en meer
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
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ opacity: 0.9 }}>youraiworker.nl</div>
              <div style={{ fontSize: 14, opacity: 0.75 }}>KvK 95290475</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
