import { ImageResponse } from "next/og";

export const alt = "Kim's World — Principal Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 50% 40%, #E9C46A33 0%, transparent 55%), linear-gradient(170deg, #FFF8F0 0%, #FFDDD2 100%)",
          fontFamily: "sans-serif",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: "#2A9D8F",
            }}
          >
            Kim&apos;s World
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#264653",
              maxWidth: "900px",
            }}
          >
            Principal Product Designer.
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#2B2D42",
              opacity: 0.7,
              maxWidth: "700px",
              marginTop: "8px",
            }}
          >
            Storyteller. Pineapple-on-pizza defender.
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "28px",
            }}
          >
            {["Design Systems", "UX Strategy", "AI-Native Design"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#2A9D8F",
                    background: "rgba(42, 157, 143, 0.12)",
                    padding: "8px 18px",
                    borderRadius: "9999px",
                  }}
                >
                  {tag}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
