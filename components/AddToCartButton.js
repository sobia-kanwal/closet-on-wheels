// components/AddToCartButton.js
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ product, variant = 'primary' }) => {
  const [loading, setLoading] = useState(false);
  const { addToCart, addToCartAndRemoveFromWishlist, isInWishlist } = useCart();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      // Check if the product is in the wishlist
      const inWishlist = isInWishlist(product.id);
      
      if (inWishlist) {
        // Use the combined function that adds to cart and removes from wishlist
        addToCartAndRemoveFromWishlist(product);
        alert(`${product.name} added to cart and removed from wishlist!`);
      } else {
        // Standard add to cart
        addToCart(product);
        alert(`${product.name} added to cart!`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const buttonClass = variant === 'primary' 
    ? 'bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50'
    : 'bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 disabled:opacity-50';

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={buttonClass}
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;