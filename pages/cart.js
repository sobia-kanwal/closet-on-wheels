// pages/cart.js (Updated with cart context)
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, clearCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  const updateDays = (productId, days) => {
    const daysValue = Math.max(1, parseInt(days) || 1);
    updateCartItem(productId, { days: daysValue });
  };

  const updateQuantity = (productId, quantity) => {
    const quantityValue = Math.max(1, parseInt(quantity) || 1);
    updateCartItem(productId, { quantity: quantityValue });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <>
      <Head>
        <title>Shopping Cart - Closet on Wheels</title>
        <meta name="description" content="Your shopping cart" />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <p className="mt-4 text-gray-500">Your cart is empty</p>
            <Link href="/" className="mt-4 btn-outline inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart.map(item => (
                      <li key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Product Image</span>
                          </div>
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">Rs. {item.total.toLocaleString()}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Rs. {item.price.toLocaleString()} / day</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center">
                                <label className="mr-2 text-gray-700">Days:</label>
                                <input 
                                  type="number" 
                                  min="1"
                                  value={item.days}
                                  onChange={(e) => updateDays(item.id, e.target.value)}
                                  className="w-16 p-1 border border-gray-300 rounded"
                                />
                              </div>
                              
                              <div className="flex items-center">
                                <label className="mr-2 text-gray-700">Qty:</label>
                                <input 
                                  type="number" 
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                                  className="w-16 p-1 border border-gray-300 rounded"
                                />
                              </div>
                            </div>

                            <button 
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <button 
                  onClick={handleClearCart}
                  className="btn-outline w-full text-center"
                >
                  Clear Cart
                </button>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({getCartItemsCount()} items)</span>
                    <span className="font-medium">Rs. {getCartTotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">Rs. {(getCartTotal() * 0.05).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-lg font-semibold text-purple-600">
                      Rs. {(getCartTotal() * 1.05).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <Link href="/checkout" className="btn-primary w-full text-center block">
                  Proceed to Checkout
                </Link>
                
                <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                  <Link href="/" className="text-purple-600 font-medium hover:text-purple-500">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .btn-primary {
          display: block;
          background-color: #8b5cf6;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
          text-align: center;
        }
        .btn-primary:hover {
          background-color: #7c3aed;
        }
        .btn-outline {
          display: block;
          background-color: white;
          color: #8b5cf6;
          font-weight: 600;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          border: 1px solid #8b5cf6;
          transition: all 0.2s;
          text-align: center;
        }
        .btn-outline:hover {
          background-color: #f5f3ff;
        }
      `}</style>
    </>
  );
};

export default Cart;