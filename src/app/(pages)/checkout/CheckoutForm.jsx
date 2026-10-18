"use client";
import { useActionState } from "react";
import { useCartStore } from "../../(components)/(store)/cartStore";
import { placeOrder } from "../../actions";
import { useSWRConfig } from "swr";
import { cancelOrder } from "../../actions";
import { useState } from "react";
function CheckoutForm() {
  const { mutate } = useSWRConfig();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const [message, setMessage] = useState("");
  const [state, formAction, pending] = useActionState(placeOrder, null);
  async function handleCancel() {
    if (!state?.id) return;

    try {
      await cancelOrder(state.id);
      await mutate("/api/orders");
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
    setMessage(`order ${state.id} cancelled succefully`);
  }
  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pale-warm-white pb-12">
      <div className="bg-pale-warm-white py-4 px-6 border-b border-gray-200 mb-6">
        <h2 className="text-2xl font-bold text-dark-espresso">Checkout delivery</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <form action={formAction} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <main className="flex flex-col gap-6">
            <div className="flex flex-col p-6 gap-4 bg-pure-white rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-dark-espresso border-b pb-2">1. Contact and Guest Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Recipient Name
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 p-2.5 bg-soft-coral-tint text-dark-espresso outline-none focus:border-mahogany-red"
                    type="text"
                    name="name"
                    id="name"
                    required
                  />
                  {state?.fieldErrors?.name && <p className="text-red-500 text-xs">{state.fieldErrors.name[0]}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    className="rounded-lg border border-gray-300 p-2.5 bg-soft-coral-tint text-dark-espresso outline-none focus:border-mahogany-red"
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                  />
                  {state?.fieldErrors?.phone && <p className="text-red-500 text-xs">{state.fieldErrors.phone[0]}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="rounded-lg border border-gray-300 p-2.5 bg-soft-coral-tint text-dark-espresso outline-none focus:border-mahogany-red w-full"
                  type="email"
                  name="email"
                  id="email"
                  required
                />
                {state?.fieldErrors?.email && <p className="text-red-500 text-xs">{state.fieldErrors.email[0]}</p>}
              </div>
            </div>

            <div className="flex flex-col p-6 gap-4 bg-pure-white rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-dark-espresso border-b pb-2">
                Delivery Location in Addis Ababa
              </h2>

              <div className="flex flex-col gap-1">
                <label htmlFor="subcity" className="text-sm font-medium text-gray-700">
                  Subcity
                </label>
                <input
                  className="rounded-lg border border-gray-300 p-2.5 bg-soft-coral-tint text-dark-espresso outline-none focus:border-mahogany-red"
                  id="subcity"
                  type="text"
                  name="subcity"
                  required
                />
                {state?.fieldErrors?.subcity && <p className="text-red-500 text-xs">{state.fieldErrors.subcity[0]}</p>}
              </div>
              <div key={items.id}>
                <input type="hidden" name="dishId" value={items[0]?.id || ""} />
                <input type="hidden" name="quantity" value={items[0]?.quantity || ""} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Specific Address / Landmark
                </label>
                <input
                  className="rounded-lg border border-gray-300 p-2.5 bg-soft-coral-tint text-dark-espresso outline-none focus:border-mahogany-red"
                  id="address"
                  type="text"
                  name="address"
                  required
                />
                {state?.fieldErrors?.address && <p className="text-red-500 text-xs">{state.fieldErrors.address[0]}</p>}
              </div>
            </div>

            <div className="flex flex-col p-6 gap-4 bg-pure-white rounded-xl shadow-sm">
              <div className="flex flex-col gap-1">
                <label htmlFor="option" className="text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  className="rounded-lg border border-gray-300 p-2.5 bg-soft-coral-tint text-dark-espresso outline-none focus:border-mahogany-red"
                  name="paymentMethod"
                  id="option"
                >
                  <option value="telebirr">Telebirr</option>
                  <option value="cbe">CBE </option>
                  <option value="master">Mastercard</option>
                </select>
                {state?.fieldErrors?.paymentMethod && (
                  <p className="text-red-500 text-xs">{state.fieldErrors.paymentMethod[0]}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Delivery Information / Notes
                </label>
                <textarea
                  className="rounded-lg border border-gray-300 p-2.5 bg-soft-coral-tint text-dark-espresso outline-none focus:border-mahogany-red"
                  name="notes"
                  id="notes"
                  rows={3}
                ></textarea>
                {state?.fieldErrors?.notes && <p className="text-red-500 text-xs">{state.fieldErrors.notes[0]}</p>}
              </div>
            </div>
          </main>

          <aside className="flex flex-col gap-4 p-6 bg-pure-white rounded-xl shadow-sm h-fit">
            <h1 className="text-lg font-bold text-dark-espresso border-b pb-2">Your Order Summary</h1>

            <div className="flex flex-col divide-y divide-gray-100 max-h-96 overflow-y-auto pr-1">
              {items.map((item) => (
                <div className="flex items-center gap-4 py-3" key={item.id}>
                  <img
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    src={`/images/${item.slug}.png`}
                    alt={item.nameEn}
                  />
                  <div className="flex flex-col flex-grow">
                    <h3 className="font-semibold text-mahogany-red">{item.nameEn}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.ingredients}</p>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Qty: {item.quantity}</span>
                      <span className="font-medium">{item.priceETB * item.quantity} ETB</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-mahogany-red">{total} ETB</span>
            </div>
            <div className="flex justify-evenly">
              <button
                className="w-fit mt-2 py-3 bg-mahogany-red text-white font-medium rounded-lg cursor-pointer hover:opacity-95 transition disabled:opacity-50"
                type="submit"
                disabled={pending}
              >
                {pending ? "Sending..." : "Confirm Order"}
              </button>
              {state?.id && (
                <button
                  className="w-fit mt-2 py-3 bg-mahogany-red text-white font-medium rounded-lg cursor-pointer"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel order
                </button>
              )}
            </div>

            {state?.id && !message && (
              <p className="text-green-600 text-sm font-medium text-center mt-2">
                Order placed successfully! Order ID - {state.id}
              </p>
            )}
            {message && <p className="text-red-600 text-sm text-center mt-2 font-medium">{message}</p>}
          </aside>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
