'use client';

import ProductCard from './ProductCard';

// 1. Add 'cart' to the props you receive here
export default function ProductList({ products, cart, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart} // 2. Pass the 'cart' prop down to ProductCard
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}