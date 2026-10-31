import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#3b2118",
        color: "white",
        fontSize: 64,
      }}
    >
      <div>Addis Eats</div>
      <div style={{ fontSize: 36, marginTop: 20 }}>Ethiopian Food</div>
    </div>,
    size,
  );
}
