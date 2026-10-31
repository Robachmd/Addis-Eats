"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import CategoryFilter from "../(CategoryFilter)/CategoryFilter";
import FilterDish from "../(CategoryFilter)/FilterDish";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function MenuWrapper({ dishes }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category") || "All";
  const search = searchParams.get("search") || "";

  const { data, error, isValidating, isLoading } = useSWR(
    "https://addis-eats-backend.onrender.com/menu/",
    fetcher,
    { fallbackData: { data: dishes }, revalidateOnFocus: true, dedupingInterval: 2000 }
  );

  const currentDishes = data?.data ?? dishes ?? [];
  const filteredDishes = selectedCategory === "All" ? currentDishes : currentDishes.filter((dish) => dish.category === selectedCategory);
  const searchedDishes = filteredDishes.filter((dish) => dish.nameEn.toLowerCase().includes(search.toLowerCase()) || dish.nameAm.toLowerCase().includes(search.toLowerCase()));

  function updateQueryParams(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  if (error && currentDishes.length === 0) return <div className="min-h-[60vh] flex items-center justify-center bg-soft-coral-tint text-mahogany-red">Could not load the menu.</div>;

  return (
    <div className="min-h-screen bg-soft-coral-tint pb-12">
    <section className="relative min-h-85 md:min-h-115] flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/menu-hero.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#281008]/95 via-[#281008]/75 to-[#281008]/20" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">
        <p className="inline-block bg-[#c18a58]/90 text-white text-[10px] sm:text-xs font-bold tracking-widest px-4 py-2 rounded-full">
          HANDCRAFTED GONDAR & ADDIS SPICES
        </p>
        <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-semibold font-serif text-white mt-6 leading-tight">
          Our Complete Culinary Heritage
        </h1>
        <p className="max-w-xl text-sm md:text-base leading-7 text-white/85 mt-5">
          Every dish is prepared daily from scratch using sun-dried spices, stone-ground legume flours, and clarified herbal butter sourced directly from highland farm cooperatives.
        </p>
        <div className="mt-7 flex items-center gap-3 text-xs font-semibold tracking-widest text-[#e8bd8d]">
          <span className="w-10 h-px bg-[#e8bd8d]" />
          AUTHENTIC ETHIOPIAN FLAVORS
        </div>
      </div>
    </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 md:mt-12">
        <div className="space-y-2 mb-4">
          {isLoading && <p className="text-sm text-taupe-brown">Loading menu...</p>}
          {error && <p className="text-sm text-amber-700">Could not refresh the menu. Showing available data.</p>}
          {isValidating && !isLoading && <p className="text-xs text-taupe-brown">Checking for menu updates...</p>}
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-5">
          <aside className="w-full lg:w-60 lg:shrink-0">
            <div className="bg-pure-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold font-serif text-mahogany-red">Categories</h2>
                <span className="text-xs text-taupe-brown">Explore</span>
              </div>
              <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={(category) => updateQueryParams("category", category)} />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="bg-pure-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-semibold text-mahogany-red">Discover Our Menu</h2>
                  <p className="text-xs sm:text-sm text-taupe-brown mt-1">Find your favorite Ethiopian dishes</p>
                </div>
                <span className="bg-pale-dusty-rose text-mahogany-red text-xs font-semibold rounded-full px-3 py-2 w-fit">{searchedDishes.length} dishes found</span>
              </div>
              <input type="text" value={search} onChange={(e) => updateQueryParams("search", e.target.value)} placeholder="Search dishes, e.g. kitfo, tibs..." className="w-full rounded-lg border border-gray-200 bg-soft-coral-tint/30 px-4 py-3 text-sm text-dark-espresso placeholder:text-taupe-brown/60 outline-none transition focus:border-mahogany-red focus:ring-2 focus:ring-mahogany-red/10" />
            </div>

            {searchedDishes.length > 0 ? <FilterDish dishes={searchedDishes} /> : (
              <div className="bg-pure-white rounded-xl border border-gray-100 py-16 px-5 text-center">
                <p className="text-4xl mb-4">🍽️</p>
                <h3 className="text-xl font-serif font-semibold text-mahogany-red">No dishes found</h3>
                <p className="text-sm text-taupe-brown mt-2">Try another search or select a different category.</p>
                <button onClick={() => { const params = new URLSearchParams(searchParams.toString()); params.delete("search"); params.delete("category"); const query = params.toString(); router.push(query ? `${pathname}?${query}` : pathname, { scroll: false }); }} className="mt-5 px-5 py-2.5 bg-mahogany-red text-white rounded-lg text-sm font-medium hover:bg-rust-red transition">View All Dishes</button>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}