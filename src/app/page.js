import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./(components)/(store)/AddToCartButton.jsx";
export const metadata = {
  title: "Home",
  description: "Explore Ethiopian food, traditional wats, injera, kitfo, and today's specials at Addis Eats.",
  alternates: {
    canonical: "/",
  },
};

const reviews = [
  {
    quote:
      "The Doro Wat was reminiscent of my grandmother's cooking in Gondar. The berbere depth and the slow-simmered onion sweet finish are impossible to find elsewhere.",
    name: "Amanuel Mengistu",
    role: "Bole Resident & Food Patron",
    initials: "AM",
  },
  {
    quote:
      "Their Fasting Beyaynetu is unmatched on Wednesdays. Twelve vibrant dishes, and the Shiro Tagamino came out bubbling in clay. True culinary devotion.",
    name: "Sara Tesfaye",
    role: "Plant-Based Dining Advocate",
    initials: "ST",
  },
  {
    quote:
      "We hosted a 10-person family reunion around their large handcrafted mesobs. The coffee ceremony with fresh frankincense made the evening unforgettable.",
    name: "Dr. Kebede Wolde",
    role: "Diaspora Homecoming Guest",
    initials: "DK",
  },
];

export default async function Home() {
  const response = await fetch("https://addis-eats-backend.onrender.com/menu/specials", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Can't fetch the special dishes");
  }

  const result = await response.json();
  const dishes = result?.data ?? [];

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#30201c]">
      <section className="bg-[#fff0e9]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:px-8 md:py-16 lg:gap-20 lg:px-10">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f8e2d8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8d2814]">
              <span>Traditional Habesha Hearth</span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Communal Warmth,
              <span className="mt-1 block italic text-[#91250f]">Slow-Cooked Heritage.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-[#79615a] sm:text-base">
              Handcrafted wats, ancient stone-ground teff injera, and velvety kitfo simmered in 72-hour infused niter
              kibbeh and heirloom berbere harvested from the Ethiopian highlands.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#specials"
                className="rounded-md bg-[#962a13] px-4 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-[#741d0c]"
              >
                Explore Today&apos;s Specials ↓
              </Link>
              <Link
                href="/menu"
                className="rounded-md bg-[#f7e4dc] px-4 py-3 text-xs font-semibold transition hover:bg-[#efd4c7]"
              >
                Full Banquet Menu
              </Link>

              <span className="rounded-md bg-[#ffead2] px-3 py-3 text-[10px] font-semibold text-[#754b17]">
                ☕ Buna Ceremony 4:00 PM Daily
              </span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-bold text-[#91250f]">100%</p>
                <p className="mt-1 text-[11px] text-[#967d72]">Brown &amp; White Teff</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#91250f]">6+ Hours</p>
                <p className="mt-1 text-[11px] text-[#967d72]">Slow Stew Caramels</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#91250f]">Gursha</p>
                <p className="mt-1 text-[11px] text-[#967d72]">Hospitality Shared</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -bottom-3 -left-3 h-full w-full rounded-xl bg-[#ffca68]" />

            <div className="relative rounded-xl bg-white p-2 shadow-2xl">
              <div className="relative h-[300px] overflow-hidden rounded-lg sm:h-[370px]">
                <Image
                  src="/images/hero-image.png"
                  alt="Traditional Ethiopian communal feast served on injera"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -top-3 right-3 flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg sm:right-0">
                <span className="rounded-md bg-[#ffe2a8] p-2">🔥</span>
                <div>
                  <p className="text-xs font-bold">Stone Ground</p>
                  <p className="text-[10px] text-[#9a8175]">Fresh Berbere Pepper</p>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-lg bg-white/95 p-4 shadow-md">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#a52d16]">Centerpiece</p>
                  <p className="mt-1 text-sm font-semibold">Great Mesob Feast</p>
                </div>
                <p className="font-bold text-[#936000]">ETB 1,650</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's specials */}
      {/* Today's specials */}
      <section id="specials" className="overflow-x-hidden px-5 py-12 md:px-8 lg:px-10">
        <div className="mt-7 overflow-x-auto overflow-y-hidden pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {" "}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#9c2a14]">✳ From the Clay Pots</p>

              <h2 className="mt-2 font-serif text-3xl font-bold">Todays Curated Chef Specials</h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#806a61]">
                Carefully balanced stews prepared at dawn using our matriarchs 40-spice blend, served piping hot on
                hand-stretched injera.
              </p>
            </div>

            <Link href="/menu" className="shrink-0 text-xs font-semibold text-[#8d2814] hover:underline">
              Full Menu →
            </Link>
          </div>
          <div className="mt-7 overflow-x-auto pb-4">
            <div className="flex w-max gap-4">
              {dishes.map((item, index) => (
                <article
                  key={item.id}
                  className="w-[230px] shrink-0 overflow-hidden rounded-xl border border-[#f1e3dc] bg-white shadow-sm transition hover:shadow-md sm:w-[250px]"
                >
                  <Link href={`/menu/dish/${item.id}`} className="block">
                    <div className="relative h-36 overflow-hidden bg-[#f2e1d7]">
                      <Image
                        src={`/images/${item.slug}.png`}
                        alt={item.nameEn}
                        fill
                        sizes="250px"
                        className="object-cover transition duration-300 hover:scale-105"
                      />

                      <span className="absolute left-2 top-2 rounded-full bg-[#9a6a00] px-2 py-1 text-[9px] font-bold text-white">
                        Chefs Special
                      </span>
                    </div>
                  </Link>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm font-bold">{item.nameEn}</h3>

                      <span className="shrink-0 text-xs font-bold text-[#91250f]">
                        ETB {Number(item.priceETB).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 min-h-8 text-[11px] leading-4 text-[#806a61]">
                      {item.description || "Discover authentic Ethiopian flavors."}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <Link
                        href={`/menu/dish/${item.id}`}
                        className="text-[11px] font-semibold text-[#936000] hover:underline"
                      >
                        Details
                      </Link>
                      <AddToCartButton dish={item} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#fff0e9]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[0.85fr_1.25fr] lg:px-10 lg:py-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#9c2a14]">♧ The Spirit of Gursha</p>

            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              &quot;Those Who Share a Mesob Never Walk Alone.&quot;
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#806a61]">
              Gursha is the cherished act of honoring a companion by rolling choice morsels of wat within warm injera
              and feeding them directly by hand. At Mesob House, every table is configured for communal warmth and slow
              gratitude.
            </p>

            <div className="mt-5 rounded-lg bg-[#f9e6de] p-4">
              <h3 className="font-semibold text-[#8d2814]">☕ Authentic Clay Jebena Buna Ceremony</h3>
              <p className="mt-2 text-xs leading-5 text-[#806a61]">
                Every day at 4:00 PM, frankincense fills our courtyard as green Sidama beans are hand-roasted on iron
                pans, ground fresh, and brewed in traditional clay Jebena pots with popped sorgum snack (Fendisha).
              </p>
              <Link href="/menu" className="mt-3 inline-block text-xs font-semibold text-[#91250f] hover:underline">
                Reserve Ceremony Seating ↗
              </Link>
            </div>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            <article className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-[#ffe1b4] px-2 py-1 text-[9px] font-bold uppercase tracking-wide">
                  House-Fermented
                </span>
                <span className="text-sm font-bold text-[#936000]">ETB 350</span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold">Golden Tej (Honey Wine)</h3>
              <p className="mt-2 text-xs leading-5 text-[#806a61]">
                Crafted in-house using raw Ethiopian wild honey and dried Gesho (indigenous hops), cold-aged for 21 days
                in glass carafes (Berele).
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#967d72]">500ml Carafe • 11% ABV</span>
                <Link
                  href="/menu"
                  className="rounded bg-[#f7e4dc] px-3 py-2 text-[10px] font-semibold hover:bg-[#efd4c7]"
                >
                  View Menu
                </Link>
              </div>
            </article>

            <article className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-[#c9f0d7] px-2 py-1 text-[9px] font-bold uppercase tracking-wide">
                  Daily Infusion
                </span>
                <span className="text-sm font-bold text-[#936000]">ETB 80</span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold">Highland Spiced Shai</h3>
              <p className="mt-2 text-xs leading-5 text-[#806a61]">
                Slow-simmered highland black tea leaves infused with crushed cinnamon bark, fragrant cardamom pods,
                cloves, and a hint of wild ginger.
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#967d72]">Served with Raw Sugar</span>
                <Link
                  href="/menu"
                  className="rounded bg-[#f7e4dc] px-3 py-2 text-[10px] font-semibold hover:bg-[#efd4c7]"
                >
                  View Menu
                </Link>
              </div>
            </article>

            <article className="flex items-center justify-between gap-4 rounded-lg bg-[#f6e2d9] p-4 sm:col-span-2">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-xl">🫓</span>
                <div>
                  <h3 className="text-sm font-bold">Extra Teff Injera Rolls (Basket of 3)</h3>
                  <p className="mt-1 text-xs leading-5 text-[#806a61]">
                    Naturally gluten-friendly ancient grain, fermented 3 days for airy eyes (Ayn).
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-2">
                <span className="font-bold">ETB 90</span>
                <Link
                  href="/menu"
                  className="rounded-md bg-[#851d08] px-3 py-2 text-center text-[10px] font-semibold text-white hover:bg-[#a42c12]"
                >
                  View Menu
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:px-10 lg:py-16">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#936000]">Voices Around the Mesob</p>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Honored Guest Reflections</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.initials} className="rounded-lg bg-[#fff0e9] p-5">
              <div className="text-xl tracking-wide text-[#936000]" aria-label="5 out of 5 stars">
                ★★★★★
              </div>

              <p className="mt-2 text-sm italic leading-6 text-[#806a61]">&quot;{review.quote}&quot;</p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2d9cc] text-xs font-bold text-[#91250f]">
                  {review.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{review.name}</h3>
                  <p className="mt-1 text-[10px] text-[#967d72]">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#fcebe4] px-5 py-10 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-xl bg-[#831a06] p-7 text-white shadow-lg sm:p-10 lg:flex-row lg:items-center lg:p-12">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ffd4a6]">Join Our Table</p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Experience Authentic Habesha Warmth Tonight
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#e9b9a8]">
              Whether gathering around our circular mesobs for communal dining or ordering freshly baked injera to your
              home in Addis Ababa.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-48">
            <Link
              href="/menu"
              className="rounded-md bg-[#ffdda5] px-5 py-3 text-center text-sm font-bold text-[#492718] transition hover:bg-[#ffca7b]"
            >
              Book a Mesob Table
            </Link>
            <Link
              href="/menu"
              className="rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-[#30201c] transition hover:bg-[#f5e8df]"
            >
              View Complete Menu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
