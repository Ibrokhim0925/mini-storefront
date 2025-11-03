'use client';

import { useState, useEffect } from 'react';

export default function Catalog() {
  // State for the master list of products
  const [products, setProducts] = useState([]);
  // State for loading status
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'

  // Effect to fetch data when the component loads
  useEffect(() => {
    async function fetchProducts() {
      setStatus('loading');
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('API fetch failed');
        const data = await response.json();
        setProducts(data);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    }
    fetchProducts();
  }, []); // Empty array means this runs only once on mount

  // Show status messages
  if (status === 'loading') return <p>Loading products...</p>;
  if (status === 'error') return <p>Error loading products.</p>;

  // Render the fetched data (for testing)
  return (
    <div>
      <h2>Product List</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}