'use client';

import Link from 'next/link';
import { Smartphone, Laptop, Shirt, Home, Gamepad2, Heart } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    icon: Smartphone,
    href: '/products?category=smartphones',
    color: 'bg-blue-500',
    description: 'Latest smartphones and gadgets'
  },
  {
    name: 'Computers',
    icon: Laptop,
    href: '/products?category=laptops',
    color: 'bg-green-500',
    description: 'Laptops, desktops and accessories'
  },
  {
    name: 'Fashion',
    icon: Shirt,
    href: '/products?category=mens-shirts',
    color: 'bg-purple-500',
    description: 'Trendy clothing and accessories'
  },
  {
    name: 'Home & Garden',
    icon: Home,
    href: '/products?category=home-decoration',
    color: 'bg-orange-500',
    description: 'Furniture and home decor'
  },
  {
    name: 'Gaming',
    icon: Gamepad2,
    href: '/products?category=gaming',
    color: 'bg-red-500',
    description: 'Gaming consoles and accessories'
  },
  {
    name: 'Health',
    icon: Heart,
    href: '/products?category=health',
    color: 'bg-pink-500',
    description: 'Health and wellness products'
  }
];

export function Categories() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="p-8 text-center">
                  <div className={`${category.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
}

