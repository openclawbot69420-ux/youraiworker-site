import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Algemene voorwaarden | Your AI Worker"
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
              background: "#f59e0b",
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
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
          Algemene voorwaarden
        </h1>
        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            maxWidth: "800px",
          }}
        >
          Duidelijke afspraken, transparante levering
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
              color: "#f59e0b",
              fontWeight: "500",
            }}
          >
            KvK: 95290475
          </span>
          <span style={{ color: "#64748b" }}>|</span>
          <span
            style={{
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            Amsterdam, Nederland
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
