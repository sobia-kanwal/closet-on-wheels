// components/AddToCartButton.js
import { useState } from 'react';

const AddToCartButton = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async () => {
    setIsAdding(true);
    
    try {
      // In a real application, this would be an API call to your backend
      // For demonstration, we'll use localStorage as a mock database
      const savedCart = localStorage.getItem('cartItems');
      const cartItems = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedCart = cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price * item.days }
            : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      } else {
        const newItem = {
          ...product,
          quantity: 1,
          days: 1,
          total: product.price * 1
        };
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItem]));
      }
      
      // Show success feedback
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button 
      onClick={addToCart}
      disabled={isAdding}
      className="btn-primary w-full"
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;