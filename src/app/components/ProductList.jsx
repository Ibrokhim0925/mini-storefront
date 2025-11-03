'use client';

import ProductCard from './ProductCard';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id} // The required 'key' prop
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}