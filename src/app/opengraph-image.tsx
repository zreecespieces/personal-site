import { ImageResponse } from "next/og";

export const alt = "Zachary Reece - Software, learning & the things between";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#151512",
        color: "#eee5d2",
        padding: "52px 64px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #4d4739",
          paddingBottom: 24,
          color: "#b49a63",
          fontSize: 18,
          letterSpacing: 4,
        }}
      >
        <span>PERSONAL NOTES & SELECTED WORK</span>
        <span>ZR</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -4, lineHeight: 1.1 }}>
            Zachary Reece
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 34 }}>
            <span>Software, learning &</span>
            <span>the things between.</span>
          </div>
        </div>
        <svg width="218" height="218" viewBox="0 0 218 218" fill="none">
          <circle cx="109" cy="109" r="89" stroke="#b49a63" strokeWidth="1.5" />
          <circle cx="109" cy="109" r="57" stroke="#4d4739" />
          <path d="M109 0V218M0 109H218" stroke="#4d4739" />
          <path d="M109 20L186 153H32L109 20Z" stroke="#b49a63" strokeWidth="1.5" />
          <circle cx="109" cy="109" r="4" fill="#eee5d2" />
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          color: "#b49a63",
          fontSize: 20,
          letterSpacing: 1,
        }}
      >
        <div style={{ width: 40, height: 2, background: "#b49a63" }} />
        <span>zacharyreece.dev</span>
      </div>
    </div>,
    size
  );
}
