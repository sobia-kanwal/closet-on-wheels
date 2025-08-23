// pages/cart.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Designer Evening Gown",
      price: 1500,
      image: "/images/products/evening-gown.jpg",
      rentalDays: 3,
      startDate: "2023-06-15",
      endDate: "2023-06-18"
    },
    {
      id: 2,
      name: "Persian Carpet",
      price: 2500,
      image: "/images/products/persian-carpet.jpg",
      rentalDays: 7,
      startDate: "2023-06-20",
      endDate: "2023-06-27"
    }
  ]);

  const updateRentalDays = (id, days) => {
    if (days < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, rentalDays: days} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.rentalDays), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <>
      <Head>
        <title>Shopping Cart - Closet on Wheels</title>
        <meta name="description" content="Review your rental items" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start adding items to your cart to see them here</p>
            <Link href="/" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Rental Items ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden mr-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-grow mt-4 sm:mt-0">
                        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                        <p className="text-purple-600 font-semibold">Rs. {item.price}/day</p>
                        
                        <div className="mt-3 flex items-center">
                          <span className="text-gray-600 mr-3">Rental Period:</span>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateRentalDays(item.id, item.rentalDays - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.rentalDays} days</span>
                            <button 
                              onClick={() => updateRentalDays(item.id, item.rentalDays + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-600">
                          <span>Total: Rs. {item.price * item.rentalDays}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="mt-4 sm:mt-0 text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">Rs. {tax}</span>
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-lg font-semibold text-purple-600">Rs. {total}</span>
                  </div>
                </div>
                
                <Link href="/checkout" className="btn-primary w-full text-center block py-3">
                  Proceed to Checkout
                </Link>
                
                <Link href="/" className="mt-3 text-center text-purple-600 hover:text-purple-800 block">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;