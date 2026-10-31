import { ImageResponse } from "next/og";
import { getDishById } from "../../../../lib/fetcher";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px",
        background: "#3b2118",
        color: "white",
        fontSize: 48,
      }}
    >
      <div style={{ fontSize: 30 }}>Addis Eats</div>
      <div style={{ marginTop: 30 }}>{dish ? dish.nameEn : "Dish Not Found"}</div>

      {dish && <div style={{ marginTop: 20, fontSize: 36 }}>{dish.priceETB} ETB</div>}
    </div>,
    size,
  );
}
