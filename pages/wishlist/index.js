// pages/wishlist/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCartAndRemoveFromWishlist } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/wishlist');
    }
  }, [user, router]);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = async (product) => {
    setLoading(true);
    setSelectedItem(product.id);
    try {
      // This function adds to cart AND removes from wishlist
      addToCartAndRemoveFromWishlist(product);
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
      setSelectedItem(null);
    }
  };

  const handleMoveAllToCart = async () => {
    setLoading(true);
    try {
      // Create a copy of the wishlist to avoid mutation during iteration
      const wishlistCopy = [...wishlist];
      for (const item of wishlistCopy) {
        // This function adds to cart AND removes from wishlist
        addToCartAndRemoveFromWishlist(item);
      }
      alert('All items moved to cart!');
    } catch (error) {
      console.error('Error moving items to cart:', error);
      alert('Failed to move some items to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Wishlist - Closet on Wheels</title>
        <meta name="description" content="Your favorite items saved for later" />
      </Head>

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            {wishlist.length > 0 && (
              <button
                onClick={handleMoveAllToCart}
                disabled={loading}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? 'Moving...' : 'Move All to Cart'}
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
              <p className="mt-1 text-gray-500">Start adding items you love to your wishlist.</p>
              <div className="mt-6">
                <Link href="/">
                  <div className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer">
                    Continue Shopping
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="relative">
                    <img
                      src={item.image || '/images/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-500"
                      aria-label="Remove from wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-600">PKR {item.price}/day</span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={loading && selectedItem === item.id}
                        className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 disabled:opacity-50"
                      >
                        {loading && selectedItem === item.id ? 'Adding...' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;