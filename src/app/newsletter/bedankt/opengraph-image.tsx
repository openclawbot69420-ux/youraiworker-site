import { ImageResponse } from "next/og" 
export const alt = "Succesvol aangemeld - Your AI Worker"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f8fafc 100%)",
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
            borderRadius: 24,
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
            fontSize: 56,
            fontWeight: 700,
            color: "#0f172a",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          Je bent aangemeld voor updates
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#64748b",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Praktische AI-agent tips elke 2 weken
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
          <div style={{ fontSize: 18, color: "#64748b" }}>
            Amsterdam
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}