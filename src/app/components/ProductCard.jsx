'use client';

// 1. Receive 'cart' as a prop
export default function ProductCard({ product, cart, onAddToCart }) {

  // 2. Find this item's quantity in the cart
  const itemInCart = cart.find(item => item.id === product.id);
  const cartQuantity = itemInCart ? itemInCart.quantity : 0;

  // 3. Define all disabled/status conditions
  const isOutOfStock = product.stock === 0;
  const isCartAtMax = cartQuantity >= product.stock;
  const isDisabled = isOutOfStock || isCartAtMax;

  let statusText = `In stock: ${product.stock}`;
  if (isOutOfStock) statusText = 'Out of stock';
  if (isCartAtMax) statusText = 'In cart: max stock';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      {/* ... (other info) ... */}
      <p className={`text-sm mt-2 ${isOutOfStock ? 'text-red-500' : ''}`}>
        {statusText}
      </p>
      <button
        onClick={() => onAddToCart(product)}
        disabled={isDisabled} // 4. Use the new disabled logic
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        {isCartAtMax ? 'Cart at Max' : 'Add to Cart'}
      </button>
    </div>
  );
}