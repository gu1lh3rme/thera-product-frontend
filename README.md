# Product Management Web Application

A full-featured product management web application built with Next.js 15, Redux Toolkit, and Mock Service Worker (MSW).

## Project Overview

This app lets you browse, filter, sort, paginate, and add products in a catalog. Products are served from an in-memory mock API powered by MSW, so the app works entirely in the browser with no backend required.

## Tech Stack

| Technology | Purpose | Why |
|---|---|---|
| **Next.js 15 (App Router)** | React framework | Server components, file-based routing, fast builds |
| **TypeScript** | Type safety | Catch bugs at compile time, better DX |
| **Tailwind CSS** | Styling | Utility-first CSS for rapid UI development |
| **Redux Toolkit** | State management | Opinionated, boilerplate-free Redux with `createSlice` and `createAsyncThunk` |
| **Mock Service Worker (MSW)** | API mocking | Intercepts fetch at the network level; realistic mock without a real server |
| **Jest + Testing Library** | Unit & snapshot tests | Fast, DOM-focused tests without a browser |

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production
```bash
npm run build
npm start
```

## Running Tests

```bash
npm test
```

To update snapshots:
```bash
npm test -- -u
```

## Architecture Overview

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with ReduxProvider
│   └── page.tsx            # Home page (MSWProvider + UI)
├── components/
│   ├── MSWProvider.tsx     # Initializes MSW browser worker before rendering
│   ├── ReduxProvider.tsx   # Wraps app with Redux store
│   ├── ProductCard.tsx     # Individual product display card
│   ├── ProductFilters.tsx  # Name search, price range, sort controls
│   ├── ProductForm.tsx     # Modal form to add a new product
│   ├── ProductList.tsx     # Fetches & renders paginated product grid
│   └── Pagination.tsx      # Page navigation controls
├── store/
│   ├── index.ts            # Store configuration and typed hooks
│   └── productsSlice.ts    # Products state, async thunks, selectors
├── mocks/
│   ├── handlers.ts         # MSW request handlers (GET/POST /api/products)
│   ├── browser.ts          # MSW browser worker setup
│   └── server.ts           # MSW Node server (for tests)
├── types/
│   └── product.ts          # Product and ProductsState TypeScript interfaces
└── __tests__/
    └── ProductCard.test.tsx # Snapshot + unit tests for ProductCard
```

### Key Design Decisions

- **MSW in browser**: The app intercepts `/api/products` requests at the network level. This means you can swap in a real API later by simply removing MSW — no code changes needed in components.
- **Redux selectors for derived state**: Filtering, sorting, and pagination logic lives in memoizable selectors (`selectFilteredProducts`, `selectPaginatedProducts`, `selectTotalPages`), keeping components simple.
- **Client components**: All interactive components use `'use client'` to enable React hooks and Redux integration while Next.js handles routing and build optimization.
