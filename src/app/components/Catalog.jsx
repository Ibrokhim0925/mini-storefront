'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  // State for master product list
  const [products, setProducts] = useState([]);
  
  // State for shopping cart
  const [cart, setCart] = useState([]);
  
  // State for filters
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 1500, // Default max
  });

  // State for data fetching status
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'empty'

  // EFFECT 1: Fetch initial product data
  useEffect(() => {
    async function fetchProducts() {
      setStatus('loading');
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);

        // Set initial max price for the filter based on fetched data
        const maxPriceFromData = Math.max(...data.map(p => p.price), 0);
        setFilters(prev => ({ ...prev, maxPrice: maxPriceFromData }));
        
        setStatus('success');
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setStatus('error');
      }
    }
    fetchProducts();
  }, []); // Empty array: runs once on mount

  // EFFECT 2: Simulate real-time stock updates
  useEffect(() => {
    if (products.length === 0) return; // Don't run if no products

    // Set up an interval
    const intervalId = setInterval(() => {
      setProducts(prevProducts => {
        const productIndex = Math.floor(Math.random() * prevProducts.length);
        
        return prevProducts.map((product, index) => {
          if (index === productIndex && product.stock > 0) {
            return { ...product, stock: product.stock - 1 };
          }
          return product;
        });
      });
    }, 3000); // 3 seconds

    // Cleanup function: runs when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [products]); // Re-run if products array changes

  // DERIVED STATE: Calculate categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [products]);

  // DERIVED STATE: Calculate max price for slider
  const maxPriceLimit = useMemo(() => {
    return Math.max(...products.map(p => p.price), 0);
  }, [products]);

  // DERIVED STATE: Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const priceMatch = product.price <= filters.maxPrice;
      return categoryMatch && priceMatch;
    });
  }, [products, filters]);

  // Effect to update status if filters are empty
  useEffect(() => {
    if (status === 'success' && filteredProducts.length === 0) {
      setStatus('empty');
    } else if (status === 'empty' && filteredProducts.length > 0) {
      setStatus('success');
    }
  }, [filteredProducts, status]);


  // HANDLER: Change category
  const handleCategoryChange = (category) => {
    setFilters(prevFilters => ({ ...prevFilters, category }));
  };

  // HANDLER: Change price
  const handlePriceChange = (price) => {
    setFilters(prevFilters => ({ ...prevFilters, maxPrice: price }));
  };

  // HANDLER: Add to cart
  const handleAddToCart = (productToAdd) => {
    const productInStock = products.find(p => p.id === productToAdd.id);
    if (!productInStock) return;

    setCart(prevCart => {
      const itemInCart = prevCart.find(item => item.id === productToAdd.id);
      
      const currentCartQty = itemInCart ? itemInCart.quantity : 0;
      if (currentCartQty >= productInStock.stock) {
        return prevCart; // Stock limit reached
      }

      if (itemInCart) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  };

  // HANDLER: Decrement from cart
  const handleDecrementItem = (productId) => {
    setCart(prevCart => {
      const itemInCart = prevCart.find(item => item.id === productId);
      
      if (itemInCart?.quantity === 1) {
        return prevCart.filter(item => item.id !== productId);
      }

      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // HANDLER: Reset cart
  const handleResetCart = () => {
    setCart([]);
  };

  // RENDER
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Column 1: Filters & Cart */}
      <aside className="lg:col-span-1 space-y-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={handleCategoryChange}
        />
        <PriceFilter
          maxPrice={filters.maxPrice}
          maxLimit={maxPriceLimit}
          onPriceChange={handlePriceChange}
        />
        <CartSummary
          cart={cart}
          onDecrementItem={handleDecrementItem}
          onResetCart={handleResetCart}
        />
      </aside>

      {/* Column 2: Products */}
      <section className="lg:col-span-3">
        <StatusMessage status={status} />
        {status === 'success' || status === 'empty' ? (
          <ProductList
            products={filteredProducts}
            cart={cart}
            onAddToCart={handleAddToCart}
          />
        ) : null}
      </section>
    </div>
  );
}