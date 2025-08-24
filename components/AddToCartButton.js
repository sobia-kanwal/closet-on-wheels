// components/AddToCartButton.js (Updated with cart context)
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      addToCart(product);
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
      onClick={handleAddToCart}
      disabled={isAdding}
      className="btn-primary w-full"
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;