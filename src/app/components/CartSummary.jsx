'use client';

import { useMemo } from 'react';

export default function CartSummary({ cart, onDecrementItem, onResetCart }) {
  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce((totals, item) => {
      totals.totalItems += item.quantity;
      totals.totalPrice += item.price * item.quantity;
      return totals;
    }, { totalItems: 0, totalPrice: 0 });
  }, [cart]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Cart</h2>
      <div className="flex justify-between">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="flex justify-between">
        <span>Total Price:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <hr/>
      {cart.length === 0 && <p className="text-gray-500">Cart is empty.</p>}
      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center">
          <span>{item.name} (x{item.quantity})</span>
          <button onClick={() => onDecrementItem(item.id)} className="text-red-500">
            Remove
          </button>
        </div>
      ))}
      {cart.length > 0 && (
        <button onClick={onResetCart} className="w-full bg-red-600 text-white py-2 rounded">
          Reset Cart
        </button>
      )}
    </div>
  );
}