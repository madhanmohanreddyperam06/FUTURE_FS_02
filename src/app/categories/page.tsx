'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Smartphone, Laptop, Shirt, Home, Gamepad2, Heart } from 'lucide-react';
import { fetchCategories, fetchProductsByCategory } from '@/lib/api';
import { Product } from '@/types';

const categoryIcons: { [key: string]: any } = {
  'smartphones': Smartphone,
  'laptops': Laptop,
  'mens-shirts': Shirt,
  'home-decoration': Home,
  'gaming': Gamepad2,
  'health': Heart,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{ [key: string]: Product[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        
        // Load sample products for each category
        const products: { [key: string]: Product[] } = {};
        for (const category of data.slice(0, 6)) {
          try {
            const categoryData = await fetchProductsByCategory(category);
            products[category] = categoryData.slice(0, 4);
          } catch (error) {
            console.error(`Error loading products for ${category}:`, error);
          }
        }
        setCategoryProducts(products);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Categories</h1>
            <p className="text-lg text-gray-600">Loading categories...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="bg-gray-300 h-16 w-16 rounded-full mx-auto mb-4"></div>
                <div className="bg-gray-300 h-6 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
        </div>

        <div className="space-y-12">
          {categories.slice(0, 6).map((category) => {
            const IconComponent = categoryIcons[category] || Home;
            const products = categoryProducts[category] || [];
            
            return (
              <div key={category} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">
                      {String(category).replace('-', ' ')}
                    </h2>
                    <p className="text-gray-600">
                      {products.length} featured products
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {products.map((product, index) => (
                    <Link
                      key={index}
                      href={`/products/${product.id}`}
                      className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                      />
                      <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                    </Link>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href={`/products?category=${category}`}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    View All {String(category).replace('-', ' ')} Products
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

