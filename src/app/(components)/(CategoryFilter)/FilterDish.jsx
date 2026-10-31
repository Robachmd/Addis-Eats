"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../(store)/cartStore";

export default function FilterDish({ dishes }) {
const addToCart = useCartStore((state) => state.addToCart);

return (
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
    {dishes.map((item) => (
    <article key={item.id} className="group flex flex-col bg-pure-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <Link href={`/menu/dish/${item.id}`} className="block overflow-hidden">
        <div className="relative overflow-hidden">
            <img src={`/images/${item.slug}.png`} alt={item.nameEn} width={400} height={300} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
            {item.isSpecial && <span className="absolute top-3 left-3 bg-mahogany-red text-white text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-full">SPECIAL</span>}
        </div>
        <div className="px-4 pt-4">
            <h3 className="text-lg font-semibold font-serif text-dark-espresso group-hover:text-mahogany-red transition-colors line-clamp-1">{item.nameEn}</h3>
            <p className="text-sm text-taupe-brown mt-1">{item.nameAm}</p>
        </div>
        </Link>

        <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
        <p className="text-sm text-taupe-brown leading-relaxed line-clamp-3">{item.description}</p>
        <div className="flex items-center justify-between gap-2 mt-auto pt-5">
            <div>
            <p className="text-[10px] uppercase tracking-wider text-taupe-brown">Price</p>
            <p className="text-lg font-bold text-mahogany-red">ETB {item.priceETB}</p>
            </div>
            <button onClick={() => addToCart(item)} className="flex items-center justify-center gap-2 bg-rust-red hover:bg-mahogany-red text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 active:scale-95">
            Add <Plus size={16} />
            </button>
        </div>
        </div>
    </article>
    ))}
</div>
);
}