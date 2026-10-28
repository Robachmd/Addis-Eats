# Addis Eats 🇪🇹

A restaurant ordering web application focused on discovering Ethiopian dishes, browsing menus, managing a shopping cart, and placing orders.

## Overview

Addis Eats provides a web interface for customers to explore dishes, filter menu categories, review their selections, and complete a checkout workflow.

The project also includes authentication interfaces, order-management functionality, API routes, and a dashboard.

## Features

- Menu browsing and category filtering.
- Dish details and search.
- Shopping cart with quantity controls.
- Checkout form and input validation.
- Login and registration interfaces.
- Order management and cancellation functionality.
- Dashboard with chart-based data visualization.
- Loading, validation, and error-handling interfaces.

Feature availability and authentication guarantees depend on the current implementation. Consult the technical documentation for known limitations.

## Technology Stack

- Next.js App Router
- React
- JavaScript and JSX
- Tailwind CSS
- Zustand
- SWR
- Zod
- Recharts

## Project Structure

```text
src/
├── app/
│   ├── (components)/
│   ├── (pages)/
│   │   ├── (auth)/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── menu/
│   ├── api/
│   │   ├── dishes/
│   │   └── orders/
│   ├── dashboard/
│   ├── lib/
│   ├── orders/
│   ├── actions.js
│   ├── layout.js
│   └── page.js
└── middleware.js
```

## Getting Started

### Prerequisites

- Node.js compatible with the installed Next.js version.
- npm.
- Access to any external services required by the application.

### Installation

Clone the repository:

```bash
git clone https://github.com/Robachmd/Addis-Eats.git
cd Addis-Eats
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env.local` file if required by the application.

Add the environment variables used by the actual implementation. Do not commit secrets or production credentials.

### Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

Run the production build before deployment and resolve any build errors.

## Testing

The application's verification process covers:

- Main customer ordering workflow.
- Input validation.
- Authentication and protected routes.
- Order ownership and cancellation.
- API response behavior.
- Error and loading states.
- Performance of the deployed application.

See the technical documentation for test procedures, results, evidence, and known limitations.

## Technical Documentation

- [Authentication and Security](./AUTH.md)
- [Data Architecture and Integrity](./DATA.md)
- [Performance Evaluation](./PERF.md)

## Known Limitations

Document the limitations that apply to the current implementation, including any mock authentication, in-memory order storage, external API dependencies, or unimplemented live-tracking functionality.

## Author

Roba chimdi

GitHub: https://github.com/Robachmd/Addis-Eats