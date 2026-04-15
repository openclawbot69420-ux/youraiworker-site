import { ImageResponse } from "next/og"

export const alt = "Aanvraag ontvangen - Your AI Worker"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #f8fafc 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
        }}
      >
        {/* Success icon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 28,
            background: "linear-gradient(145deg, #10b981 0%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 8px 30px rgba(16, 185, 129, 0.25)",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#0f172a",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          Aanvraag ontvangen
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "#475569",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          We nemen binnen 1 werkdag contact op
        </div>

        {/* Timeline preview */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 40,
            padding: "16px 32px",
            borderRadius: 16,
            background: "rgba(15, 23, 42, 0.05)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              1
            </div>
            <span style={{ fontSize: 16, fontWeight: 500, color: "#0f172a" }}>Intake</span>
          </div>
          <div style={{ width: 24, height: 2, background: "#cbd5e1" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              2
            </div>
            <span style={{ fontSize: 16, fontWeight: 500, color: "#64748b" }}>Voorstel</span>
          </div>
          <div style={{ width: 24, height: 2, background: "#cbd5e1" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              3
            </div>
            <span style={{ fontSize: 16, fontWeight: 500, color: "#64748b" }}>Live</span>
          </div>
        </div>

        {/* Brand footer */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>AI</span>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            Your AI Worker
          </div>
          <div style={{ width: 1, height: 24, background: "#cbd5e1" }} />
          <div style={{ fontSize: 18, color: "#64748b" }}>48 uur garantie</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
