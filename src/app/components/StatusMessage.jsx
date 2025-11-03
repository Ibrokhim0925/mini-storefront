'use client';

export default function StatusMessage({ status }) {
  
  const styles = "text-center text-lg font-medium p-8 rounded-lg mb-6";

  switch (status) {
    case 'loading':
      return (
        <div className={`${styles} bg-blue-100 text-blue-700`}>
          Loading products...
        </div>
      );
    case 'error':
      return (
        <div className={`${styles} bg-red-100 text-red-700`}>
          Error: Failed to load products. Please try refreshing the page.
        </div>
      );
    case 'empty':
      return (
        <div className={`${styles} bg-yellow-100 text-yellow-700`}>
          No products match your current filters.
        </div>
      );
    case 'success':
    default:
      return null; // Render nothing when data is loaded
  }
}