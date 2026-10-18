
"use client";

import { useCartStore } from "./cartStore";

export default function AddToCartButton({ dish }) {
  const addToCart = useCartStore((state) => state.addToCart);

  function handleAddToCart() {
    addToCart(dish);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="rounded-md bg-[#851d08] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#a42c12]"
    >
      Add +
    </button>
  );
}
