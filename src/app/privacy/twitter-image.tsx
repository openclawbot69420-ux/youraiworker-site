import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Privacybeleid | Your AI Worker"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "16px",
            background: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: "white",
            marginBottom: "12px",
          }}
        >
          Privacybeleid
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#94a3b8",
          }}
        >
          AVG/GDPR compliant
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}
