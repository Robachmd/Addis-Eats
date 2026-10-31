"use client";

import { Trash2, Plus, Minus, RotateCcw } from "lucide-react";
import { useCartStore } from "./cartStore";
import { useRouter } from "next/navigation";

function CartClient() {
const router = useRouter();
const items = useCartStore((state) => state.items);
const total = useCartStore((state) => state.total);
const itemCount = useCartStore((state) => state.itemCount);
const itemCounts = useCartStore((state) => state.itemCounts);
const removeFromCart = useCartStore((state) => state.removeFromCart);
const clearCart = useCartStore((state) => state.clearCart);
const increaseQuantity = useCartStore((state) => state.increaseQuantity);
const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

function gotoCheckout() {
router.push("/checkout");
}

return (
<div className="min-h-screen bg-pale-warm-white px-4 sm:px-6 lg:px-10 py-8 md:py-12">
    <div className="max-w-7xl mx-auto">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-mahogany-red">Your Total Gursha Basket</h1>
        <p className="text-sm text-taupe-brown mt-2">{itemCount} items in your basket</p>
        </div>
        <span className="flex items-center justify-center bg-pale-dusty-rose text-mahogany-red font-semibold rounded-full w-12 h-12 text-lg">{itemCount}</span>
    </div>

    {items.length === 0 ? (
        <div className="bg-pure-white rounded-2xl shadow-sm border border-gray-100 px-5 py-16 text-center">
        <div className="text-5xl mb-4">🧺</div>
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-mahogany-red">Your basket is empty</h2>
        <p className="text-sm text-taupe-brown mt-2">Discover our delicious Ethiopian dishes and add your favorites.</p>
        <button onClick={() => router.push("/menu")} className="mt-6 bg-rust-red hover:bg-mahogany-red text-white font-medium px-6 py-3 rounded-lg transition">Explore Menu</button>
        </div>
    ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <section className="flex-1 w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
                <h2 className="text-lg sm:text-xl font-serif font-semibold text-mahogany-red">Clay Pot Stews & Provisions</h2>
                <p className="text-xs text-taupe-brown mt-1">{itemCounts} handcrafted selections</p>
            </div>
            <button onClick={clearCart} className="flex items-center gap-2 text-sm font-medium text-taupe-brown hover:text-red-600 transition w-fit">
                <RotateCcw size={15} /> Clear Cart
            </button>
            </div>

            <div className="space-y-4">
            {items.map((item) => (
                <article key={item.id} className="relative flex flex-col sm:flex-row gap-4 bg-pure-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
                <img src={`/images/${item.slug}.png`} alt={item.nameEn} className="w-full h-44 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg shrink-0" />

                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3 className="text-lg font-bold font-serif text-mahogany-red">{item.nameEn}</h3>
                        <p className="text-xs text-taupe-brown mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.nameEn}`} className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600 transition">
                        <Trash2 size={19} />
                    </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-taupe-brown">Price</p>
                        <p className="text-lg font-bold text-mahogany-red">ETB {item.priceETB}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 bg-soft-coral-tint rounded-lg p-1">
                        <button onClick={() => decreaseQuantity(item.id)} aria-label="Decrease quantity" className="flex items-center justify-center w-9 h-9 rounded-md bg-pure-white text-mahogany-red hover:bg-pale-dusty-rose transition">
                            <Minus size={16} />
                        </button>
                        <span className="w-5 text-center font-semibold text-mahogany-red">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} aria-label="Increase quantity" className="flex items-center justify-center w-9 h-9 rounded-md bg-rust-red text-white hover:bg-mahogany-red transition">
                            <Plus size={16} />
                        </button>
                        </div>
                    </div>
                    </div>

                    <p className="text-xs text-taupe-brown mt-3">Subtotal: <span className="font-semibold text-mahogany-red">ETB {item.priceETB * item.quantity}</span></p>
                </div>
                </article>
            ))}
            </div>
        </section>

        <aside className="w-full lg:w-80 lg:shrink-0 bg-pure-white rounded-xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-serif font-semibold text-mahogany-red mb-5">Order Summary</h2>

            <div className="flex justify-between text-sm text-taupe-brown pb-4 border-b border-gray-100">
            <span>Selected dishes</span>
            <span>{itemCounts}</span>
            </div>

            <div className="flex justify-between text-sm text-taupe-brown py-4 border-b border-gray-100">
            <span>Total quantity</span>
            <span>{itemCount}</span>
            </div>

            <div className="flex justify-between items-center py-5">
            <span className="font-medium text-dark-espresso">Grand Total</span>
            <strong className="text-2xl font-bold font-serif text-mahogany-red">ETB {total}</strong>
            </div>

            <button onClick={gotoCheckout} className="w-full bg-rust-red hover:bg-mahogany-red text-white font-semibold text-sm py-3.5 px-4 rounded-lg transition active:scale-[0.98]">
            Proceed to Delivery Checkout
            </button>

            <button onClick={() => router.push("/menu")} className="w-full mt-3 border border-gray-200 hover:bg-soft-coral-tint text-taupe-brown font-medium text-sm py-3 rounded-lg transition">
            Continue Shopping
            </button>

            <p className="text-center text-xs text-taupe-brown mt-5">Thank you for choosing Mesob House!</p>
        </aside>
        </div>
    )}
    </div>
</div>
);
}

export default CartClient;