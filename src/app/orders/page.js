import { getOrders } from "../lib/db";
import OrderTable from "./OrderTable";
import Link from "next/link";

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const perPage = 10;

  const allOrders = await getOrders();

  const total = allOrders.length;
  const rows = allOrders.slice((page - 1) * perPage, page * perPage);

  const pages = Math.ceil(total / perPage);

  return (
    <>
      <OrderTable orders={rows} />

      <div className="flex gap-4 p-4">
        {page > 1 && <Link href={`/orders?page=${page - 1}`}>Previous</Link>}

        <span>
          Page {page} of {pages || 1}
        </span>

        {page < pages && <Link href={`/orders?page=${page + 1}`}>Next</Link>}
      </div>
    </>
  );
}
