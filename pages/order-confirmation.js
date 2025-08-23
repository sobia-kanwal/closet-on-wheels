// pages/order-confirmation.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const OrderConfirmation = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading order data
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, this would come from your API or context
      const order = {
        orderId: orderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString(),
        status: 'Confirmed',
        items: [
          {
            id: 1,
            name: 'Designer Evening Gown',
            image: '/images/products/evening-gown.jpg',
            price: 1500,
            days: 3,
            total: 4500
          },
          {
            id: 2,
            name: 'Persian Carpet',
            image: '/images/products/persian-carpet.jpg',
            price: 2500,
            days: 7,
            total: 17500
          }
        ],
        subtotal: 22000,
        tax: 1100,
        delivery: 0,
        total: 23100,
        shipping: {
          name: 'John Doe',
          address: '123 Main Street, Block 5',
          city: 'Karachi',
          email: 'john.doe@example.com',
          phone: '+92 300 1234567'
        },
        paymentMethod: 'Credit Card',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      
      setOrderData(order);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Order Confirmation - Closet on Wheels</title>
        <meta name="description" content="Your rental order confirmation" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Success Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
              <p className="text-gray-600 mb-4">Thank you for your rental. Your order is now being processed.</p>
              <p className="text-sm text-gray-500">Order #{orderData.orderId} • Placed on {orderData.date}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {orderData.items.map(item => (
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
                    <span className="font-medium">Rs. {orderData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">Rs. {orderData.tax.toLocaleString()}</span>
                  </div>
                  {orderData.delivery > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">Rs. {orderData.delivery.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-lg font-semibold text-purple-600">Rs. {orderData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Payment Details */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>
                  
                  <div className="space-y-2">
                    <p className="font-medium">{orderData.shipping.name}</p>
                    <p className="text-gray-600">{orderData.shipping.address}</p>
                    <p className="text-gray-600">{orderData.shipping.city}</p>
                    <p className="text-gray-600">{orderData.shipping.email}</p>
                    <p className="text-gray-600">{orderData.shipping.phone}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600"><span className="font-medium">Estimated Delivery:</span> {orderData.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      {orderData.paymentMethod === 'Credit Card' ? (
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{orderData.paymentMethod}</p>
                      <p className="text-sm text-gray-600">Paid on {orderData.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Need Help?</h2>
              <p className="text-gray-600 mb-4">If you have any questions about your rental, here are some ways to get in touch with us.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <svg className="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
                  <p className="text-sm text-gray-600">+92 21 1234567</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <svg className="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="font-medium text-gray-800 mb-1">Email Us</h3>
                  <p className="text-sm text-gray-600">support@closetonwheels.com</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <svg className="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  <h3 className="font-medium text-gray-800 mb-1">Live Chat</h3>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary text-center py-3 px-6">
                Continue Shopping
              </Link>
              <button className="btn-outline py-3 px-6" onClick={() => window.print()}>
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-primary {
          background-color: #8b5cf6;
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
          color: #8b5cf6;
          font-weight: 600;
          border: 1px solid #8b5cf6;
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

export default OrderConfirmation;