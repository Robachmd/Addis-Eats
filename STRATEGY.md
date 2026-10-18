# STRATEGY.md --- Addis Eats

## 1. Purpose

Addis Eats is a Next.js restaurant website for discovering Ethiopian
dishes and specials, viewing dish details, managing a cart, and placing
orders. Keep the code beginner-friendly, explicit, and consistent with
the existing App Router structure.

## 2. Stack and conventions

-   Next.js App Router with JavaScript/JSX (not TypeScript)
-   Tailwind CSS for styling
-   Zustand for client-side cart state
-   Zod for server-side form validation where already used
-   Public menu API: `https://addis-eats-backend.onrender.com/menu/`
-   Specials API:
    `https://addis-eats-backend.onrender.com/menu/specials`
-   Shared code under `src/app/lib`; shared UI under
    `src/app/(components)`

Prefer existing helpers and patterns over adding libraries or
abstractions without a clear need.

## 3. Main user journey

1.  Visit the home page and browse specials.
2.  Browse `/menu` and open `/menu/dish/[id]`.
3.  Add dishes to the Zustand cart.
4.  Review `/cart` and proceed to `/checkout`.
5.  Validate checkout data on the server and submit an order.
6.  If a protected route is opened without a session cookie, redirect to
    `/login` while preserving the intended destination.
7.  Log out by clearing the session cookie.

Provide clear empty, error, and validation states.

## 4. Routes

-   `/` --- home and featured dishes
-   `/menu` --- menu listing
-   `/menu/dish/[id]` --- dynamic dish details
-   `/cart` --- cart
-   `/checkout` --- checkout
-   `/login` --- login
-   `/register` and `/orders` --- if implemented

Route groups organize files but do not appear in URLs.

## 5. Data strategy

The external menu API is the source of truth for public menu content.
Expected fields include `id`, `slug`, `nameEn`, `nameAm`, `category`,
`priceETB`, `spiceLevel`, `isFasting`, `isSpecial`, `description`,
`ingredients`, and `servings`.

-   Check `response.ok` before parsing.
-   Read menu arrays with `result?.data ?? []`.
-   Use the API's actual field names (`nameEn`, `priceETB`, etc.).
-   Put reusable fetch logic in `src/app/lib/fetcher.js`; helpers may
    include `getDishes()` and `getDishById(id)`.
-   Compare IDs consistently, e.g. `String(dish.id) === String(id)`.

The mock/in-memory `src/app/lib/db.js` is separate from the public menu
API. It is useful for practice but is not durable production storage.

## 6. Rendering and caching

-   Default to Server Components for pages that fetch menu data.
-   Use Client Components only where browser interaction, event
    handlers, client hooks, or Zustand are needed.
-   Use `next: { revalidate: 3600 }` when one-hour menu revalidation is
    acceptable.
-   Use `generateStaticParams()` for dish IDs to pre-render.
-   Export `generateMetadata()` at module scope, not inside the page
    component.
-   Call `notFound()` when a dish ID cannot be found.
-   Add SWR or client fetching only when client-side refresh is
    genuinely required.

## 7. Cart and checkout

Zustand owns client-side cart items and quantities. Keep quantity and
count calculations consistent in the store. The cart UI supports adding,
removing, and changing quantities. Checkout uses the existing Zod schema
and displays validation errors.

For real orders, the server must verify dish IDs and quantities and
recompute prices and totals from trusted data. Never trust a
client-submitted total or hidden field.

## 8. Authentication

The current learning flow checks whether a `session` cookie exists. Root
`middleware.js` protects configured routes and redirects to
`/login?next=...`. `src/app/lib/session.js` owns cookie helpers, and
server actions handle login/logout.

Validate the `next` destination as a safe local path. Middleware
redirects are navigation control, not complete authentication security.
Cookie existence alone does not verify identity; before production,
verify the session/token and enforce authorization on the server.
Configure secure cookies for the deployment environment; `secure: true`
requires HTTPS.

## 9. SEO

-   Define site-wide metadata and title templates in
    `src/app/layout.js`.
-   Add static route metadata and dynamic dish metadata using actual API
    fields such as `nameEn`, `priceETB`, and `description`.
-   Add Open Graph images where useful.
-   Generate `sitemap.xml` from real dish IDs and the configured site
    URL.
-   Configure `robots.txt` to publish the sitemap and guide crawlers
    away from transactional routes where appropriate.
-   Set `NEXT_PUBLIC_SITE_URL` to the real deployed origin in
    production, not `localhost`.

## 10. Quality checks

Check `response.ok`, handle missing dishes with `notFound()`, and
provide useful empty/error states. Validate submitted data on the
server. Do not expose secrets or trust client-provided prices or
identity. Test the home, menu, dish, cart, checkout, login/logout,
sitemap, and robots routes after relevant changes.

## 11. Definition of done

A feature is complete when it follows `BOUNDARY.md`, uses the correct
data source and field names, handles success/empty/error states, uses
client code only where necessary, enforces server-side validation and
authorization, and has been tested on the relevant routes.
