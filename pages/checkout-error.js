// pages/checkout-error.js
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CheckoutError = () => {
  const router = useRouter();
  const { error } = router.query;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          setCartItems(items);
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  const getErrorMessage = () => {
    switch(error) {
      case 'payment_failed':
        return 'Your payment could not be processed. Please check your payment details and try again.';
      case 'insufficient_funds':
        return 'Your transaction was declined due to insufficient funds. Please use a different payment method.';
      case 'network_error':
        return 'We encountered a network issue while processing your order. Please check your connection and try again.';
      case 'invalid_details':
        return 'The information you provided appears to be invalid. Please review your details and try again.';
      default:
        return 'We encountered an issue while processing your order. Please try again or contact support if the problem persists.';
    }
  };

  const getErrorTitle = () => {
    switch(error) {
      case 'payment_failed':
        return 'Payment Processing Failed';
      case 'insufficient_funds':
        return 'Insufficient Funds';
      case 'network_error':
        return 'Network Error';
      case 'invalid_details':
        return 'Invalid Information';
      default:
        return 'Order Processing Failed';
    }
  };

  const tryAgain = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Order Processing Failed - Closet on Wheels</title>
        <meta name="description" content="There was an issue with your order" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Error Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{getErrorTitle()}</h1>
              <p className="text-gray-600 mb-6">{getErrorMessage()}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={tryAgain}
                  className="btn-primary py-3 px-6"
                >
                  Try Again
                </button>
                <Link href="/" className="btn-outline py-3 px-6 text-center">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Need Immediate Help?</h2>
              <p className="text-gray-600 mb-4">Our customer support team is available to assist you with your order.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6 text-teal-600 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="font-medium text-gray-800">Call Us: </span>
                  <span className="text-gray-600">+92 21 1234567</span>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6 text-teal-600 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="font-medium text-gray-800">Email Us: </span>
                  <span className="text-gray-600">support@closetonwheels.com</span>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.days} days × Rs. {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="font-medium">Rs. {item.total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {cartItems.reduce((sum, item) => sum + item.total, 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">Rs. {(cartItems.reduce((sum, item) => sum + item.total, 0) * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-lg font-semibold text-teal-600">
                      Rs. {(cartItems.reduce((sum, item) => sum + item.total, 0) * 1.05).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-primary {
          background-color: #008994;
          color: white;
          font-weight: 600;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: #7c3aed;
        }
        .btn-outline {
          background-color: white;
          color: #008994;
          font-weight: 600;
          border: 1px solid #008994;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }
        .btn-outline:hover {
          background-color: #f5f3ff;
        }
      `}</style>
    </>
  );
};

export default CheckoutError;