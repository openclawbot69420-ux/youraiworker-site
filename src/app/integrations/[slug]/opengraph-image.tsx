import { ImageResponse } from "next/og"
import { INTEGRATIONS } from "../../../lib/catalog"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const integration = INTEGRATIONS.find((item) => item.slug === slug)

  if (!integration) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                  fontSize: 56,
                  fontWeight: 700,
                  letterSpacing: -1,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  maxWidth: 900,
                }}
              >
                Integratie
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
                Productierijpe AI-agents voor Nederlandse bedrijven
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
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: 20,
                  fontWeight: 60,
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
                <span>youraiworker.nl</span>
              </div>
            </div>
          </div>
        </div>
      ),
      { ...size }
    )
  }

  const exampleText = integration.exampleAutomations.slice(0, 2).join(" * ")

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
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: -1,
                color: "#ffffff",
                lineHeight: 1.1,
                maxWidth: 900,
              }}
            >
              {integration.name} integratie
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
              {integration.shortDescription.slice(0, 120)}
              {integration.shortDescription.length > 120 ? "..." : ""}
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
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  padding: "12px 20px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Live in 3-10 werkdagen
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                youraiworker.nl/integrations/{slug}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
