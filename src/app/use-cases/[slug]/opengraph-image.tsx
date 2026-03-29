import { ImageResponse } from "next/og"
import { USE_CASES } from "../../../lib/catalog"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const useCase = USE_CASES.find((item) => item.slug === slug)

  const title = useCase?.title ?? "Toepassing"
  const description = useCase?.shortDescription ?? "AI-agent implementatie"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                Y
              </div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                Your AI Worker
              </span>
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.1,
                maxWidth: 900,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.4,
                maxWidth: 900,
              }}
            >
              {description}
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
              }}
            >
              <span
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                youraiworker.nl
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(6, 182, 212, 0.2)",
                  border: "1px solid rgba(6, 182, 212, 0.4)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#67e8f9",
                }}
              >
                From EUR 1,000
              </span>
              <span
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#6ee7b7",
                }}
              >
                No monthly fees
              </span>
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
