import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 600 }
export const contentType = "image/png"

export default function SecurityTwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #b91c1c 60%, #ef4444 100%)",
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
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.05,
              }}
            >
              Beveiliging
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: 1.2,
                maxWidth: 980,
              }}
            >
              Security-first implementatie
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.82)",
                lineHeight: 1.35,
                maxWidth: 900,
              }}
            >
              Least-privilege, logging, audit trail en versleutelde verbindingen
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
            <div
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(15, 23, 42, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Tailscale | Secrets mgmt
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
