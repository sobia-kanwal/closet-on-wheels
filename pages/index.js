// pages/index.js (Home page with products from database)
import { useState, useEffect } from 'react';
import Head from 'next/head';
import MainHeader from '../components/MainHeader';
import AddToCartButton from '../components/AddToCartButton';
import { db } from '../lib/db';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = db.products.getAll();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <MainHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Closet on Wheels - Rent Everything You Need</title>
        <meta name="description" content="Rent clothing, decor, and event supplies" />
      </Head>

      <MainHeader />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-purple-600 font-bold mb-4">Rs. {product.price.toLocaleString()} / day</p>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}