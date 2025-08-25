// components/AddToWishlistButton.js
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const AddToWishlistButton = ({ product, showText = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  // Check if product is already in wishlist on component mount
  useEffect(() => {
    setIsLiked(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleToggleWishlist = async () => {
    try {
      if (isLiked) {
        removeFromWishlist(product.id);
        setIsLiked(false);
      } else {
        addToWishlist(product);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling wish list:', error);
      alert('Failed to update wish list. Please try again.');
    }
  };

  if (showText) {
    return (
      <button 
        onClick={handleToggleWishlist}
        className="flex items-center text-gray-600 hover:text-purple-600"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 mr-1 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`}  
          viewBox="0 0 24 24" 
          stroke="currentColor"
          fill={isLiked ? 'currentColor' : 'none'}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
        {isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    );
  }

  return (    
    <button 
      onClick={handleToggleWishlist}
      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`}  
        viewBox="0 0 24 24" 
        stroke="currentColor"
        fill={isLiked ? 'currentColor' : 'none'}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        ></path>
      </svg>
    </button>
  );
};

export default AddToWishlistButton;