"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Flame, Leaf, Users, BookOpen, Plus, Minus, ShoppingBag, Check, Landmark } from "lucide-react";
import { useCartStore } from "../(store)/cartStore";

const heatOptions = [
  { name: "Mild", description: "Alicha touch, fragrant cardamoms", level: "1/3" },
  { name: "Traditional", description: "Berbere warmth (Recommended)", level: "2/3" },
  { name: "Fiery Awaze", description: "Awaze and Mitmita dip", level: "3/3" },
];

const injeraOptions = [
  {
    name: "Standard Teff & Barley Blend",
    description: "Spongy, tart sourdough, naturally soft",
    extra: 0,
    label: "Included",
  },
  {
    name: "100% Pure Organic Brown Teff",
    description: "Gluten-free, iron-rich, nutty grain",
    extra: 60,
    label: "+ETB 60",
  },
];

const sideOptions = [
  { name: "Fresh Ayib", description: "Mild fresh cottage curd", extra: 0 },
  { name: "Stewed Gomen", description: "Garlic-infused collard greens", extra: 0 },
  { name: "House Awaze Paste", description: "Aged tej and berbere sauce", extra: 0 },
  { name: "Extra Braised Egg", description: "Slow-cooked in the wat broth", extra: 40 },
];

export default function DishDetailsClient({ dish }) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const [heatLevel, setHeatLevel] = useState("Traditional");
  const [injeraType, setInjeraType] = useState(injeraOptions[0].name);
  const [selectedSides, setSelectedSides] = useState(["Fresh Ayib"]);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const selectedInjera = injeraOptions.find((option) => option.name === injeraType);

  const sideCost = selectedSides.reduce((total, name) => {
    const side = sideOptions.find((option) => option.name === name);
    return total + (side?.extra || 0);
  }, 0);

  const unitPrice = Number(dish.priceETB) + (selectedInjera?.extra || 0) + sideCost;

  const totalPrice = unitPrice * quantity;

  const images = [`/images/${dish.slug}.png`, `/images/${dish.slug}.png`, `/images/${dish.slug}.png`];

  function toggleSide(name) {
    setSelectedSides((current) => {
      if (current.includes(name)) {
        return current.filter((side) => side !== name);
      }

      if (current.length >= 2) {
        return current;
      }

      return [...current, name];
    });
  }

  function handleAddToOrder() {
    const customizedDish = {
      ...dish,
      nameEn: `${dish.nameEn} (${heatLevel}, ${injeraType}${selectedSides.length ? `, ${selectedSides.join(", ")}` : ""})`,
      priceETB: unitPrice,
      heatLevel,
      injeraType,
      sideAccent: selectedSides,
    };

    addToCart(customizedDish, quantity);
    router.push("/cart");
  }

  const optionClass = (selected) =>
    `rounded-lg border p-2.5 text-left transition ${
      selected
        ? "border-[#a52d17] bg-[#a52d17] text-white"
        : "border-transparent bg-[#fae9e3] text-[#34241f] hover:border-[#d8a99c]"
    }`;

  return (
    <main className="min-h-screen bg-[#f8f4ee] px-3 py-4 sm:px-5 lg:px-20">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_0.95fr] xl:gap-6">
        <section className="min-w-0 space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-[#ead7c6]">
            <img src={images[activeImage]} alt={dish.nameEn}  className="h-[240px] w-full object-cover sm:h-[280px] xl:h-[320px]"/>

            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-[#ffc65b] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#59350b]">
                ✺ House Signature
              </span>

              <span className="rounded-full bg-[#164d38] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-white">
                <Leaf className="mr-1 inline size-3" />
                100% Teff Option
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-[10px] text-white">
              <span className="rounded-md bg-black/40 px-2 py-1.5">
                <Flame className="mr-1 inline size-3" />
                Traditional Preparation
              </span>
              <span className="italic">Mesob Addis Recipe</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-lg border-2 ${
                  activeImage === index ? "border-[#a52d17]" : "border-transparent"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img src={image} alt={`${dish.nameEn} view ${index + 1}`} className="h-14 w-full object-cover sm:h-16" />
              </button>
            ))}
          </div>
          <article className="rounded-xl bg-[#fff0e9] p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#fbe4da] text-[#8d220f]">
                <BookOpen className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-[#946000]">
                  Heritage & Lineage · Our Kitchen
                </p>

                <h2 className="font-serif text-xl font-bold text-[#3b2119]">{dish.nameEn}</h2>

                <p className="mt-1.5 text-xs leading-5 text-[#73564e]">{dish.description}</p>

                {dish.ingredients?.length > 0 && (
                  <p className="mt-2 text-xs leading-5 text-[#73564e]">
                    <span className="font-semibold">Ingredients: </span>
                    {dish.ingredients.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </article>
          <div className="grid grid-cols-3 gap-2">
            {[
              { title: "Preparation", value: "Traditional" },
              { title: "Category", value: dish.category || "Ethiopian" },
              { title: "Servings", value: dish.servings || "1–2 people" },
            ].map((item) => (
              <div key={item.title} className="min-w-0 rounded-lg bg-[#fae9e3] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wide text-[#97776e]">{item.title}</p>
                <p className="mt-1.5 text-xs font-semibold text-[#34241f]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="min-w-0 rounded-xl bg-white p-4 shadow-sm sm:p-5 xl:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-serif text-2xl font-bold leading-tight text-[#851d0c] sm:text-3xl">{dish.nameEn}</h1>

              <p className="mt-1 text-sm text-[#a18a80]">{dish.nameAm}</p>
            </div>

            <div className="shrink-0 rounded-lg bg-[#f7e7df] px-3 py-2 text-right">
              <p className="text-[10px] text-[#8b5a06]">ETB</p>
              <p className="text-2xl font-bold leading-tight text-[#895900]">{unitPrice}</p>
            </div>
          </div>

          <p className="mt-3 text-xs leading-5 text-[#725b53]">{dish.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#987b70]">
            <span>
              <Users className="mr-1 inline size-3.5 text-[#16563b]" />
              Serves {dish.servings || "1–2"}
            </span>
            <span>•</span>
            <span>Injera options available</span>
            <span>•</span>
            <span className="font-semibold text-[#16563b]">Taxes included</span>
          </div>
          <section className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#30231f]">
                1. Heat & Spice Level <Flame className="inline size-3.5 text-red-800" />
              </h2>
              <span className="text-[9px] text-[#96776d]">Required</span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {heatOptions.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  onClick={() => setHeatLevel(option.name)}
                  className={optionClass(heatLevel === option.name)}
                >
                  <span className="flex items-center justify-between gap-1 text-xs font-semibold">
                    {option.name}
                    <span className="text-[9px] opacity-80">{option.level}</span>
                  </span>

                  <span className="mt-1 block text-[10px] leading-4 opacity-80">{option.description}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#30231f]">2. Traditional Injera Base</h2>
              <span className="text-[9px] text-[#96776d]">Choose 1</span>
            </div>

            <div className="space-y-2">
              {injeraOptions.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  onClick={() => setInjeraType(option.name)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                    injeraType === option.name
                      ? "border-[#a52d17] bg-[#a52d17] text-white"
                      : "border-transparent bg-[#fae9e3] text-[#34241f] hover:border-[#d8a99c]"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold">{option.name}</span>
                    <span className="mt-1 block text-[10px] leading-4 opacity-80">{option.description}</span>
                  </span>

                  <span className="shrink-0 text-[10px] font-bold">{option.label}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-[#30231f]">3. Complimentary Side Accents</h2>
                <p className="mt-1 text-[10px] text-[#96776d]">Select up to 2 side dishes</p>
              </div>

              <span className="shrink-0 rounded-full bg-[#f7e7df] px-2 py-1 text-[9px] font-semibold text-[#8c4b30]">
                {selectedSides.length}/2 selected
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {sideOptions.map((option) => {
                const selected = selectedSides.includes(option.name);

                return (
                  <button type="button" key={option.name}
                    onClick={() => toggleSide(option.name)}
                    aria-pressed={selected}
                    className={`flex min-h-[68px] items-center gap-2 rounded-lg border p-2.5 text-left transition ${
                      selected
                        ? "border-[#a52d17] bg-[#fff0e9]"
                        : "border-transparent bg-[#fae9e3] hover:border-[#d8a99c]"
                    }`}
                  >
                    <span className={`flex size-4 shrink-0 items-center justify-center rounded border ${ selected ? "border-[#a52d17] bg-[#a52d17] text-white" : "border-gray-400 bg-white"  }`}
                    >
                      {selected && <Check className="size-3" />}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold text-[#34241f]">{option.name}</span>
                      <span className="mt-1 block text-[10px] leading-4 text-[#96776d]">{option.description}</span>
                    </span>

                    <span className="shrink-0 text-[9px] font-bold text-[#16563b]">
                      {option.extra ? `+${option.extra}` : "Free"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <div className="flex items-center justify-between rounded-lg bg-[#fae9e3] px-3 sm:justify-center sm:gap-3">
              <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="p-2 hover:text-[#a52d17]" aria-label="Decrease quantity" >
                <Minus className="size-3.5" />
              </button>

              <span className="min-w-4 text-center text-sm font-semibold">{quantity}</span>

              <button type="button" onClick={() => setQuantity((current) => current + 1)} className="p-2 hover:text-[#a52d17]" aria-label="Increase quantity"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            <button  type="button" onClick={handleAddToOrder} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#a52d17] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#86210f]" >
              <ShoppingBag className="size-4" />
              Add to Order · ETB {totalPrice}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button type="button" onClick={() => setFavorite((current) => !current)} className={`flex items-center gap-1.5 ${favorite ? "text-red-700" : "text-[#725b53]"}`} >
              <Heart className="size-4" fill={favorite ? "currentColor" : "none"} />
              {favorite ? "Saved to Favorites" : "Save to Favorites"}
            </button>

            <button type="button" onClick={() => router.push("/menu")} className="flex items-center gap-1.5 font-medium text-[#895900] hover:text-[#a52d17]" >
              <Landmark className="size-3.5" />
              Explore Our Menu
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
