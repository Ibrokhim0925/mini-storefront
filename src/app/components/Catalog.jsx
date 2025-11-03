'use client';

// Imports
import { useState, useEffect, useMemo } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  
  // State
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 1500,
  });
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'empty'

  // Effect 1: Fetch initial product data
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

  // Effect 2: Simulate real-time stock updates
  useEffect(() => {
    if (products.length === 0) return; // Don't run if no products

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

  // Derived State: Calculate categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [products]);

  // Derived State: Calculate max price for slider
  const maxPriceLimit = useMemo(() => {
    return Math.max(...products.map(p => p.price), 0);
  }, [products]);

  // Derived State: Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const priceMatch = product.price <= filters.maxPrice;
      return categoryMatch && priceMatch;
    });
  }, [products, filters]);

  // Effect 3: Update status if filters are empty (MUST be after filteredProducts)
  useEffect(() => {
    if (status === 'success' && filteredProducts.length === 0) {
      setStatus('empty');
    } else if (status === 'empty' && filteredProducts.length > 0) {
      setStatus('success');
    }
  }, [filteredProducts, status]);


  // Handlers
  const handleCategoryChange = (category) => {
    setFilters(prevFilters => ({ ...prevFilters, category }));
  };

  const handlePriceChange = (price) => {
    setFilters(prevFilters => ({ ...prevFilters, maxPrice: price }));
  };

  const handleAddToCart = (productToAdd) => {
    const productInStock = products.find(p => p.id === productToAdd.id);
    if (!productInStock) return;

    setCart(prevCart => {
      const itemInCart = prevCart.find(item => item.id === productToAdd.id);
      
      const currentCartQty = itemInCart ? itemInCart.quantity : 0;
      if (currentCartQty >= productInStock.stock) {
        return prevCart;
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

  const handleResetCart = () => {
    setCart([]);
  };

  // Render
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
        
        {/* Correct placement of StatusMessage */}
        <StatusMessage status={status} />
        
        {/* Conditional rendering of the product list */}
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