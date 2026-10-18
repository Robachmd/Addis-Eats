# BOUNDARY.md --- Addis Eats

## 1. Purpose

This document defines each layer's responsibility so pages, data
fetching, cart state, authentication, checkout, and SEO stay separate.

## 2. Responsibilities

### Route pages --- `src/app/**/page.jsx`

**Own:** route-level display, calling data helpers/actions,
`notFound()`, and route metadata exports when supported.

**Do not:** duplicate shared fetch logic, own global cart calculations,
treat client UI as authorization, or define `generateMetadata()` inside
the page component.

### Shared UI --- `src/app/(components)/**`

**Own:** reusable presentation such as header, footer, dish cards,
filters, and layout pieces.

**Do not:** duplicate business rules or assume API fields that do not
exist.

### External menu API

**Own:** public menu and specials data.

Expected fields include `id`, `slug`, `nameEn`, `nameAm`, `category`,
`priceETB`, `spiceLevel`, `isFasting`, `isSpecial`, `description`,
`ingredients`, and `servings`.

**Rules:** check `response.ok`; handle `result?.data ?? []`; treat
responses as external input; do not confuse these fields with the mock
database's `name` and `price`.

### Data helpers --- `src/app/lib/fetcher.js`

**Own:** shared fetch behavior, HTTP error checks, JSON parsing, and
reusable helpers such as `getDishes()` and `getDishById(id)`.

**Do not:** render JSX, update Zustand, handle login/logout, or
authorize orders.

### Mock database --- `src/app/lib/db.js`

**Own:** practice database functions and mock order/session-related data
currently implemented there.

**Rules:** this is not the public menu API. In-memory changes may
disappear on restart and are not production persistence.

### Zustand cart store

**Own:** client cart items, quantity updates, removal, and consistent
derived counts/totals.

**Do not:** authenticate users, persist authoritative orders, decide
authorization, or serve as the trusted price source for server-side
order creation.

### Session helpers --- `src/app/lib/session.js`

**Own:** reading, setting, and clearing the session cookie; centralizing
cookie options.

**Do not:** choose which routes are protected or assume cookie presence
proves identity in a production system.

### Middleware --- root `middleware.js`

**Own:** checking session-cookie presence for configured protected
routes, redirecting to login, and preserving the requested path plus
query string in `next`.

**Do not:** create orders, validate checkout data, or replace
authorization checks inside sensitive server actions and route handlers.
Only matched routes are covered by middleware.

### Server actions --- `src/app/actions.js`

**Own:** server-side form submissions such as login/logout and order
placement; Zod validation; calls to session/database helpers; structured
errors or redirects.

**Do not:** trust hidden inputs as proof of identity or price, rely only
on browser validation, or expose secrets to client code. Protected
mutations must verify identity and authorization on the server.

### Login/logout UI

**Own:** collecting form input, displaying action results, and passing
form data to server actions. Redirect destinations from `next` must be
restricted to safe local paths.

**Do not:** set cookies in browser JavaScript or trust arbitrary
redirect URLs.

### Checkout UI

**Own:** collecting customer/delivery information, showing cart summary,
and displaying validation/order status.

**Do not:** treat client totals, hidden dish IDs, quantities, or user
IDs as trusted. The server validates inputs and recomputes authoritative
order details.

### SEO files

Metadata, Open Graph images, `sitemap.js`, and `robots.js` describe
public pages to search engines/social platforms.

**Do not:** use SEO output for access control or expose private
user/order information in metadata, images, or sitemaps.

## 3. Server/client boundary

Use Server Components by default for menu fetching, metadata, and
server-only work. Use Client Components for browser interactions, event
handlers, Zustand, client navigation hooks, and interactive form state.
Pass serializable data from Server Components to Client Components.
Never import server-only cookie/database helpers into client components.

## 4. Trust boundary

Treat browser-submitted form fields, hidden inputs, query parameters,
cart totals, quantities, and unverified cookie values as untrusted.
Validate data on the server, verify identity/authorization on the
server, and recompute prices from trusted menu data before persisting an
order.

## 5. Learning scope vs production

**Current learning scope:** external API for menu data; Zustand for
cart; mock in-memory DB for practice order flows; session-cookie
existence check for practicing middleware; SEO metadata, Open Graph,
sitemap, and robots.

**Before production:** add persistent user/order storage, real
session/token verification, server-side authorization for every
protected mutation, server-side price/quantity verification, secure
cookie and secret management, reliable logging/error handling/tests, and
the real production `NEXT_PUBLIC_SITE_URL`.

Do not describe the practice cookie check as secure authentication or
the in-memory database as durable storage.

## 6. Change rule

Change the smallest responsible layer: - Display/layout → route or
shared UI component - Menu fetching → `fetcher.js` / API integration -
Cart behavior → Zustand store - Validation/order mutation → Zod schema
and server action - Route redirects → middleware, plus server-side
authorization where required - SEO → metadata or SEO route files

Avoid duplicating the same rule across layers unless duplication is
intentionally needed for user feedback and server-side enforcement.
