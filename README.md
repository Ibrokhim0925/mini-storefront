# Project 04: React + Next.js Mini-Storefront

This is a solution for the Mini-Storefront coding project. It's built with Next.js (App Router), React (using JavaScript/JSX), and Tailwind CSS.

## Features

* **Product Catalog:** Fetches and displays a list of products from a local API route.
* **Filtering:** Filter products by category (dropdown) and maximum price (slider).
* **Shopping Cart:** Add items to a cart, view totals, decrement items, and reset the cart.
* **Real-time Stock:** Simulates real-time inventory updates using a `setInterval` effect.
* **Dynamic UI:** "Add to Cart" buttons automatically disable based on product stock and cart quantity.
* **Status States:** Shows loading, error, and empty-filter messages.

## Setup & Running the Application

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd mini-storefront
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Rubric Requirement Checklist

Here is a checklist referencing each requirement from the grading rubric:

* **✅ Project Setup & Structure (15 pts)**
    * [x] Project created with `create-next-app` using the specified settings (No TS, Yes ESLint, Yes Tailwind, Yes `src/`, Yes App Router).
    * [x] All required files and components (`page.jsx`, `api/products/route.js`, `Catalog.jsx`, etc.) are present in the correct `src/app/` locations.
    * [x] All components in `src/app/components/` use the `'use client';` directive.
    * [x] API route `src/app/api/products/route.js` created and returns a JSON list of products.

* **✅ Components + JSX + Keys (20 pts)**
    * [x] All components are valid React components returning JSX.
    * [x] `ProductList.jsx` maps over the products array.
    * [x] A stable `key={product.id}` is used in the `ProductList` map.
    * [x] `CartSummary.jsx` maps over the cart array to render list items.
    * [x] A stable `key={item.id}` is used in the `CartSummary` map.

* **✅ Props + Lifting State (20 pts)**
    * [x] `Catalog.jsx` holds the "lifted" state for `products`, `cart`, and `filters`.
    * [x] `Catalog` passes data *down* as props (e.g., `products` to `ProductList`, `cart` to `CartSummary`).
    * [x] `Catalog` passes event handlers (callbacks) *down* as props (e.g., `onCategoryChange` to `CategoryFilter`, `onAddToCart` to `ProductList`/`ProductCard`).
    * [x] Child components call these callbacks to send data/events *up* to the `Catalog` parent.

* **✅ State + Controlled Inputs (15 pts)**
    * [x] `useState` is used in `Catalog.jsx` to manage state.
    * [x] `CategoryFilter` (`<select>`) is a controlled input: its `value` is set by `selectedCategory` prop, and it calls `onCategoryChange` via `onChange`.
    * [x] `PriceFilter` (`<input type="range">`) is a controlled input: its `value` is set by `maxPrice` prop, and it calls `onPriceChange` via `onChange`.
    * [x] State updates are immutable (e.g., using `...prev` spread syntax).

* **✅ Effects + Cleanup (20 pts)**
    * [x] A `useEffect` with an empty dependency array (`[]`) is used in `Catalog.jsx` to fetch products on component mount.
    * [x] A `useEffect` is used to simulate inventory count changes with a `setInterval`.
    * [x] This `useEffect` includes a **cleanup function** that calls `clearInterval()` when the component unmounts.

* **✅ UX + Conditional Rendering (10 pts)**
    * [x] `StatusMessage.jsx` correctly renders different messages for `loading`, `error`, and `empty` states.
    * [x] `ProductCard.jsx` conditionally renders "Out of stock" text when `product.stock === 0`.
    * [x] The "Add to Cart" button is conditionally `disabled` based on stock.
    * [x] The cart displays an "empty" message when `cart.length === 0`.