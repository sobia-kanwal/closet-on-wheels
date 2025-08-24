// pages/my-orders.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainHeader from '../components/MainHeader';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, confirmed, delivered, cancelled

  // Load orders from database
  useEffect(() => {
    const loadOrders = () => {
      try {
        // In a real app, this would be an API call to your backend
        // with user authentication to get only their orders
        const ordersData = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Sort orders by date (newest first)
        const sortedOrders = ordersData.sort((a, b) => 
          new Date(b.orderDate) - new Date(a.orderDate)
        );
        
        setOrders(sortedOrders);
        setError(null);
      } catch (error) {
        console.error('Error loading orders:', error);
        setError('Error loading your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Filter orders based on selected filter
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  // Get order status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format status text
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

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
        <title>My Orders - Closet on Wheels</title>
        <meta name="description" content="View your rental orders" />
      </Head>

      <MainHeader />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Orders</h1>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setFilter('confirmed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setFilter('shipped')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'shipped' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                >
                  Shipped
                </button>
                <button
                  onClick={() => setFilter('delivered')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'delivered' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                >
                  Delivered
                </button>
                <button
                  onClick={() => setFilter('cancelled')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'cancelled' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                >
                  Cancelled
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {filter === 'all' ? 'No orders found' : `No ${filter} orders`}
                </h2>
                <p className="text-gray-600 mb-6">
                  {filter === 'all' 
                    ? "You haven't placed any orders yet." 
                    : `You don't have any ${filter} orders.`
                  }
                </p>
                <Link href="/" className="btn-primary inline-block">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => (
                  <div key={order.orderId} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h3>
                          <p className="text-gray-600 text-sm">
                            Placed on {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Items</h4>
                          <div className="space-y-4">
                            {order.items.map(item => (
                              <div key={item.id} className="flex items-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4 flex items-center justify-center">
                                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">Image</span>
                                  </div>
                                </div>
                                <div className="flex-grow">
                                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-600">{item.days} days × Rs. {item.price.toLocaleString()}</p>
                                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <span className="font-medium">Rs. {item.total.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Order Details</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">Rs. {order.subtotal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tax (5%)</span>
                                <span className="font-medium">Rs. {order.tax.toLocaleString()}</span>
                              </div>
                              {order.delivery > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Delivery Fee</span>
                                  <span className="font-medium">Rs. {order.delivery.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="font-semibold text-gray-800">Total</span>
                                <span className="font-semibold text-purple-600">Rs. {order.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          <h4 className="font-medium text-gray-800 mt-4 mb-2">Shipping Information</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-800">{order.customer.firstName} {order.customer.lastName}</p>
                            <p className="text-sm text-gray-600">{order.customer.address}</p>
                            <p className="text-sm text-gray-600">{order.customer.city}</p>
                            <p className="text-sm text-gray-600">{order.customer.email}</p>
                            <p className="text-sm text-gray-600">{order.customer.phone}</p>
                          </div>

                          <h4 className="font-medium text-gray-800 mt-4 mb-2">Payment Method</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-800">
                              {order.paymentMethod === 'credit-card' ? 'Credit/Debit Card' : 
                               order.paymentMethod === 'jazzcash' ? 'JazzCash' :
                               order.paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'Cash on Delivery'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      <div className="flex justify-end space-x-4">
                        <Link href={`/order-confirmation?orderId=${order.orderId}`} className="btn-outline">
                          View Details
                        </Link>
                        {order.status === 'confirmed' && (
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                            Cancel Order
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">
                            Rent Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-primary {
          background-color: #8b5cf6;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
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
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: 1px solid #8b5cf6;
          transition: all 0.2s;
        }
        .btn-outline:hover {
          background-color: #f5f3ff;
        }
      `}</style>
    </>
  );
};

export default MyOrders;