const etb = (v) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

export default function OrderTable({ orders }) {
  return (
    <table className="w-full border-collapse border">
      <caption className="p-3 text-left font-bold">Your orders, most recent first</caption>

      <thead>
        <tr>
          <th className="border p-3">Order</th>
          <th className="border p-3">Total</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td className="border p-3">{o.id}</td>
            <td className="border p-3">{etb(o.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
