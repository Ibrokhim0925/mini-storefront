'use client';

import { useState, useEffect } from 'react';
import ProductList from './ProductList'; // Import

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => { /* ... (same as before) ... */ }, []);

  // Placeholder callback function
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
    // We will add cart logic here later
  };

  if (status === 'loading') return <p>Loading products...</p>;
  if (status === 'error') return <p>Error loading products.</p>;

  return (
    <div className="grid grid-cols-4 gap-8">
      <aside className="col-span-1">
        {/* Filters will go here */}
      </aside>
      <section className="col-span-3">
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
        />
      </section>
    </div>
  );
}