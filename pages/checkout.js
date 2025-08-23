// pages/checkout.js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Checkout = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'credit-card'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment and create order
    alert('Order placed successfully!');
    router.push('/order-confirmation');
  };

  return (
    <>
      <Head>
        <title>Checkout - Closet on Wheels</title>
        <meta name="description" content="Complete your rental order" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select City</option>
                    <option value="karachi">Karachi</option>
                    <option value="lahore">Lahore</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="rawalpindi">Rawalpindi</option>
                    <option value="peshawar">Peshawar</option>
                    <option value="quetta">Quetta</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-purple-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-purple-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="jazzcash"
                        checked={formData.paymentMethod === 'jazzcash'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">JazzCash</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-purple-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="easypaisa"
                        checked={formData.paymentMethod === 'easypaisa'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">EasyPaisa</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-purple-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
                
                <button type="submit" className="btn-primary w-full py-3 text-lg">
                  Complete Order
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal (2 items)</span>
                  <span className="font-medium">Rs. 8,500</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-medium">Rs. 425</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-semibold text-purple-600">Rs. 8,925</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3 text-gray-800">Rental Items</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <img src="/images/products/evening-gown.jpg" alt="Evening Gown" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-800">Designer Evening Gown</p>
                      <p className="text-sm text-gray-600">3 days × Rs. 1,500</p>
                    </div>
                    <span className="font-medium">Rs. 4,500</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <img src="/images/products/persian-carpet.jpg" alt="Persian Carpet" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-800">Persian Carpet</p>
                      <p className="text-sm text-gray-600">7 days × Rs. 2,500</p>
                    </div>
                    <span className="font-medium">Rs. 17,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;