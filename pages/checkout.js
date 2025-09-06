// pages/checkout.js (Updated to use cart context)
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    jazzcashNumber: '',
    easypaisaNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const taxAmount = getCartTotal() * 0.05;
  const orderTotal = getCartTotal() + taxAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    
    // Payment method specific validation
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Use MM/YY format';
      
      if (!formData.cardCVC.trim()) newErrors.cardCVC = 'CVC is required';
      else if (!/^\d{3,4}$/.test(formData.cardCVC)) newErrors.cardCVC = 'CVC must be 3 or 4 digits';
    } 
    else if (formData.paymentMethod === 'jazzcash' && !formData.jazzcashNumber.trim()) {
      newErrors.jazzcashNumber = 'JazzCash number is required';
    }
    else if (formData.paymentMethod === 'easypaisa' && !formData.easypaisaNumber.trim()) {
      newErrors.easypaisaNumber = 'EasyPaisa number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processOrder = async () => {
    // In a real app, this would call your API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a unique order ID
        const orderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
        
        // Create order object
        const order = {
          orderId,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city
          },
          items: cart,
          subtotal: getCartTotal(),
          tax: taxAmount,
          delivery: formData.paymentMethod === 'cash' ? 100 : 0,
          total: formData.paymentMethod === 'cash' ? orderTotal + 100 : orderTotal,
          paymentMethod: formData.paymentMethod,
          orderDate: new Date().toISOString(),
          status: 'confirmed'
        };
        
        // Save order to localStorage (in a real app, this would be sent to your backend)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear the cart
        clearCart();
        
        resolve(orderId);
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const orderId = await processOrder();
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Order processing error:', error);
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Add space after every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formattedValue
    });
  };

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
            <button 
              onClick={() => router.push('/')}
              className="btn-primary py-2 px-6"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

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
                      className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                      aria-invalid={errors.firstName ? "true" : "false"}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                      aria-invalid={errors.lastName ? "true" : "false"}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
                    className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                    aria-invalid={errors.address ? "true" : "false"}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                    aria-invalid={errors.city ? "true" : "false"}
                  >
                    <option value="">Select City</option>
                    <option value="karachi">Karachi</option>
                    <option value="lahore">Lahore</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="rawalpindi">Rawalpindi</option>
                    <option value="peshawar">Peshawar</option>
                    <option value="quetta">Quetta</option>
                  </select>
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-teal-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleInputChange}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-gray-700">Credit/Debit Card</span>
                    </label>
                    
                    {formData.paymentMethod === 'credit-card' && (
                      <div className="ml-8 mt-2 space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className={`input-field ${errors.cardNumber ? 'border-red-500' : ''}`}
                            aria-invalid={errors.cardNumber ? "true" : "false"}
                          />
                          {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              maxLength="5"
                              className={`input-field ${errors.cardExpiry ? 'border-red-500' : ''}`}
                              aria-invalid={errors.cardExpiry ? "true" : "false"}
                            />
                            {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                            <input
                              type="text"
                              id="cardCVC"
                              name="cardCVC"
                              value={formData.cardCVC}
                              onChange={handleInputChange}
                              placeholder="123"
                              maxLength="4"
                              className={`input-field ${errors.cardCVC ? 'border-red-500' : ''}`}
                              aria-invalid={errors.cardCVC ? "true" : "false"}
                            />
                            {errors.cardCVC && <p className="mt-1 text-sm text-red-600">{errors.cardCVC}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-teal-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="jazzcash"
                        checked={formData.paymentMethod === 'jazzcash'}
                        onChange={handleInputChange}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-gray-700">JazzCash</span>
                    </label>
                    
                    {formData.paymentMethod === 'jazzcash' && (
                      <div className="ml-8 mt-2 p-4 bg-gray-50 rounded-lg">
                        <label htmlFor="jazzcashNumber" className="block text-sm font-medium text-gray-700 mb-1">JazzCash Number</label>
                        <input
                          type="text"
                          id="jazzcashNumber"
                          name="jazzcashNumber"
                          value={formData.jazzcashNumber}
                          onChange={handleInputChange}
                          placeholder="0300 1234567"
                          className={`input-field ${errors.jazzcashNumber ? 'border-red-500' : ''}`}
                          aria-invalid={errors.jazzcashNumber ? "true" : "false"}
                        />
                        {errors.jazzcashNumber && <p className="mt-1 text-sm text-red-600">{errors.jazzcashNumber}</p>}
                        <p className="mt-2 text-sm text-gray-600">You will receive a payment request on your JazzCash number</p>
                      </div>
                    )}
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-teal-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="easypaisa"
                        checked={formData.paymentMethod === 'easypaisa'}
                        onChange={handleInputChange}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-gray-700">EasyPaisa</span>
                    </label>
                    
                    {formData.paymentMethod === 'easypaisa' && (
                      <div className="ml-8 mt-2 p-4 bg-gray-50 rounded-lg">
                        <label htmlFor="easypaisaNumber" className="block text-sm font-medium text-gray-700 mb-1">EasyPaisa Number</label>
                        <input
                          type="text"
                          id="easypaisaNumber"
                          name="easypaisaNumber"
                          value={formData.easypaisaNumber}
                          onChange={handleInputChange}
                          placeholder="0312 3456789"
                          className={`input-field ${errors.easypaisaNumber ? 'border-red-500' : ''}`}
                          aria-invalid={errors.easypaisaNumber ? "true" : "false"}
                        />
                        {errors.easypaisaNumber && <p className="mt-1 text-sm text-red-600">{errors.easypaisaNumber}</p>}
                        <p className="mt-2 text-sm text-gray-600">You will receive a payment request on your EasyPaisa number</p>
                      </div>
                    )}
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-teal-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-gray-700">Cash on Delivery</span>
                    </label>
                    
                    {formData.paymentMethod === 'cash' && (
                      <div className="ml-8 mt-2 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Pay with cash when your order is delivered. An additional Rs. 100 delivery charge will be applied.</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full py-3 text-lg flex items-center justify-center"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Complete Order'
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">Rs. {getCartTotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-medium">Rs. {taxAmount.toLocaleString()}</span>
                </div>
                
                {formData.paymentMethod === 'cash' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">Rs. 100</span>
                  </div>
                )}
                
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-semibold text-teal-600">
                    Rs. {(formData.paymentMethod === 'cash' ? orderTotal + 100 : orderTotal).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3 text-gray-800">Rental Items</h3>
                
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3 flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
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
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .input-field:focus {
          outline: none;
          ring: 2px;
          ring-color: #008994;
          border-color: #008994;
        }
        .btn-primary {
          background-color: #008994;
          color: white;
          font-weight: 600;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        .btn-primary:hover:not(:disabled) {
          background-color: #7c3aed;
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default Checkout;