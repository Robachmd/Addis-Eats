"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const etb = (v) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

export default function RevenueChart({ revenue, daily }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section>
        <h2 className="mb-4 font-bold">Revenue by Area (ETB)</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenue}>
              <XAxis dataKey="area" />
              <YAxis tickFormatter={etb} width={80} />
              <Tooltip formatter={(v) => [etb(v), "Revenue"]} />
              <Bar dataKey="revenue" fill="#1B4D8E" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="mb-1 font-bold">Orders Per Day</h2>
        <p className="mb-4 text-sm text-gray-600">October 1–10, 2026 · Unit: number of orders</p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={daily}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line dataKey="orders" stroke="#1B4D8E" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
