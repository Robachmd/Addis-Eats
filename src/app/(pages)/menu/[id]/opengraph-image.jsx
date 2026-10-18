import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export default async function Image({ params }) {
  const dish = await getDish(params.id);
  return new ImageResponse(
    <div style={{ fontSize: 72, background: "#0A1F3D" }}>
      {dish.name} — {dish.price} ETB
    </div>,
  );
}
