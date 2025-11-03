'use client';

/**
 * PriceFilter Component
 * * A "controlled component" for filtering by max price.
 * - Receives the current `maxPrice` as a prop.
 * - Receives the slider's `maxLimit` as a prop.
 * - Calls the `onPriceChange` callback prop when the user slides the control.
 */
export default function PriceFilter({ maxPrice, maxLimit, onPriceChange }) {
  
  // If maxLimit hasn't loaded yet (it's 0), don't render the slider
  // to prevent it from looking broken.
  if (maxLimit === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Price
        </label>
        <p className="text-gray-500 text-sm">Loading price range...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Price: <span className="font-bold text-gray-900">${maxPrice}</span>
      </label>
      <input
        id="price"
        type="range"
        min="0"
        max={maxLimit} // The max possible price from all products
        value={maxPrice} // 1. Receives value from parent
        onChange={(e) => onPriceChange(Number(e.target.value))} // 2. Sends new value to parent
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>$0</span>
        <span>${maxLimit}</span>
      </div>
    </div>
  );
}