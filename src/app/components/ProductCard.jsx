'use client';

export default function ProductCard({ product, onAddToCart }) {
  // For now, the button is always enabled
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-xl font-bold mt-2">${product.price}</p>
      <p className="text-sm mt-2">
        {isOutOfStock ? 'Out of stock' : `In stock: ${product.stock}`}
      </p>
      <button
        onClick={() => onAddToCart(product)}
        disabled={isOutOfStock}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        Add to Cart
      </button>
    </div>
  );
}