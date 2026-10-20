
import Link from "next/link";
import { getOrders } from "../lib/db";
import RevenueChart from "./RevenueChart";

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const state = params?.state;

  if (state === "error") {
    throw new Error("Dashboard failed to load");
  }

  let orders = await getOrders();

  const byArea = ["Mexico","Piassa", "Kazanchis", "Megenagna"].map(
    (area) => ({
      area,
      revenue: orders
        .filter((o) => o.area === area)
        .reduce((sum, o) => sum + o.total, 0),
    })
  );

  const byDay = Object.values(
    orders.reduce((summary, o) => {
      if (!summary[o.date]) {
        summary[o.date] = { date: o.date, orders: 0 };
      }
      
      summary[o.date].orders += 1;
      return summary;
    }, {})
  ).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <main className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Addis Eats Dashboard</h1>

      <RevenueChart revenue={byArea} daily={byDay} />

      <h2 className="text-xl font-bold">Revenue Data</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Area</th>
            <th className="border p-2">Revenue (ETB)</th>
          </tr>
        </thead>
        <tbody>
          {byArea.map((item) => (
            <tr key={item.area}>
              <td className="border p-2">{item.area}</td>
              <td className="border p-2">{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold">Orders Per Day</h2>
      <p>October 1–10, 2026 · Unit: number of orders</p>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Orders</th>
          </tr>
        </thead>
        <tbody>
          {byDay.map((item) => (
            <tr key={item.date}>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href="/orders" className="text-blue-700 underline">
        View all orders
      </Link>
    </main>
  );
}
