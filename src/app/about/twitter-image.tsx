import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Over Your AI Worker - AI-agent implementatie voor Nederlandse bedrijven";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "64px",
        }}
      >
        {/* Logo / Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#94a3b8",
            }}
          >
            Your AI Worker
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "700",
            color: "#ffffff",
            lineHeight: "1.1",
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          Over ons
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            fontWeight: "400",
            color: "#cbd5e1",
            lineHeight: "1.4",
            maxWidth: "800px",
          }}
        >
          AI-agent implementatie voor Nederlandse bedrijven
        </p>

        {/* Bottom trust badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "48px",
            padding: "12px 20px",
            borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#e2e8f0",
            }}
          >
            Gevestigd in Amsterdam - KvK 95290475
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
