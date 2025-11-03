'use client';

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        id="category"
        className="block w-full p-2 border border-gray-300 rounded-md"
        value={selectedCategory} // 1. Receives value from parent
        onChange={(e) => onCategoryChange(e.target.value)} // 2. Sends new value to parent
      >
        {categories.map(cat => (
          <option key={cat} value={cat} className="capitalize">{cat}</option>
        ))}
      </select>
    </div>
  );
}