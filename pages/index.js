// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import BannerSlider from '../components/BannerSlider';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';

export default function Home({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    dateRange: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Head>
        <title>Closet on Wheels - Rent Fashion, Home Items & Events Products</title>
        <meta name="description" content="Rent fashion, home items and event products in Pakistan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Banner Slider */}
      <BannerSlider />

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />
      

{/* Categories Section */}
<section className="bg-gray-100 py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Category</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <div className="h-48 relative">
          <Image
            src="/images/categories/Pakistani-Bridal-Wear-Designers.jpg"
            alt="Fashion"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Fashion</h3>
          <p className="text-gray-600">Rent designer dresses, accessories and more</p>
          <Link href="/category/fashion" className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-700 transition duration-300 w-full inline-block text-center">
            Explore Fashion
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <div className="h-48 relative">
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
            alt="Home Items"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Home Items</h3>
          <p className="text-gray-600">Rent furniture, decor and kitchen appliances</p>
          <Link href="/category/home" className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-700 transition duration-300 w-full inline-block text-center">
            Explore Home Items
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <div className="h-48 relative">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
            alt="Events"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Events</h3>
          <p className="text-gray-600">Rent equipment and supplies for your events</p>
          <Link href="/category/events" className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-sm hover:bg-purple-700 transition duration-300 w-full inline-block text-center">
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* How It Works Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Browse & Select</h3>
              <p className="text-gray-600">Explore our wide range of products and add them to your cart</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Choose Rental Period</h3>
              <p className="text-gray-600">Select your rental dates and proceed to checkout</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Enjoy & Return</h3>
              <p className="text-gray-600">Use the product and return it after your rental period ends</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Products</h2>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
// In your index.js, update the initialProducts data:
export async function getServerSideProps() {
  // This would fetch from your MongoDB in production
  const initialProducts = [
    {
      id: 1,
      name: "Designer Evening Gown",
      price: 2500,
      rentalPrice: 1500,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFraXN0YW5pJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      category: "fashion",
      location: "Lahore"
    },
    {
      id: 2,
      name: "Persian Carpet",
      price: 45000,
      rentalPrice: 2500,
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc2lhbiUyMGNhcnBldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "home",
      location: "Islamabad"
    },
    {
      id: 3,
      name: "Wedding Decor Set",
      price: 30000,
      rentalPrice: 8000,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMj极速加速器fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      category: "events",
      location: "Karachi"
    },
    {
      id: 4,
      name: "Designer Handbag",
      price: 15000,
      rentalPrice: 1200,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "fashion",
      location: "Lahore"
    },
    {
      id: 5,
      name: "Dining Table Set",
      price: 35000,
      rentalPrice: 3000,
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGluaW5nJTIwdGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      category: "home",
      location: "Karachi"
    },
    {
      id: 6,
      name: "Sound System",
      price: 20000,
      rentalPrice: 2500,
      image: "https://images.unsplash.com/photo-1520444451380-ebe0f7b9cfd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "events",
      location: "Islamabad"
    },
    {
      id: 7,
      name: "Traditional Kurta",
      price: 8000,
      rentalPrice: 800,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFraXN0YW5pJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      category: "fashion",
      location: "Lahore"
    },
    {
      id: 8,
      name: "Coffee Machine",
      price: 15000,
      rentalPrice: 1000,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwbWFjaGluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "home",
      location: "Rawalpindi"
    },
  ];

  return {
    props: {
      initialProducts,
    },
  };
}