import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    { id: 'p1', name: 'Laptop', price: 1200, category: 'Electronics', stock: 5 },
    { id: 'p2', name: 'Desk Chair', price: 150, category: 'Furniture', stock: 3 },
    { id: 'p3', name: 'Phone', price: 900, category: 'Electronics', stock: 4 },
    { id: 'p4', name: 'Coffee Mug', price: 15, category: 'Homeware', stock: 30 },
    { id: 'p5', name: 'Gaming Mouse', price: 75, category: 'Electronics', stock: 5 },
    { id: 'p6', name: 'Denim Jeans', price: 60, category: 'Apparel', stock: 12 },
    // ... add 2-6 more items ...
  ];

  // Add a small delay to simulate real network loading
  await new Promise(resolve => setTimeout(resolve, 500));

  return Response.json(products);
}