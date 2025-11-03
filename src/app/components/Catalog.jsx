'use client';

import { useState, useEffect, useMemo } from 'react'; // Import useMemo
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter'; // Import
// ... import PriceFilter too

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  // 1. Add state for filters
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 1500, // A high default
  });

  useEffect(() => { /* ... (fetch logic) ... */ }, []);

  const handleAddToCart = (product) => { /* ... */ };

  // 2. Add event handlers to update filter state
  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handlePriceChange = (price) => {
    setFilters(prev => ({ ...prev, maxPrice: price }));
  };

  // 3. Derive unique categories for the filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [products]); // Only recalculates when products change

  // 4. Derive the filtered list of products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const priceMatch = product.price <= filters.maxPrice;
      return categoryMatch && priceMatch;
    });
  }, [products, filters]); // Recalculates when products or filters change

  // ... (loading/error checks) ...

  return (
    <div className="grid grid-cols-4 gap-8">
      <aside className="col-span-1 space-y-6">
        {/* 5. Pass state and handlers down as props */}
        <CategoryFilter
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={handleCategoryChange}
        />
        {/* <PriceFilter ... /> */}
      </aside>
      <section className="col-span-3">
        {/* 6. Render the *filtered* list */}
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </section>
    </div>
  );
}