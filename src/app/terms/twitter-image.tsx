import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Algemene voorwaarden | Your AI Worker"

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
            background: "#f59e0b",
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
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
          Algemene voorwaarden
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#94a3b8",
          }}
        >
          Duidelijke afspraken
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}
