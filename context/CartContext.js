// context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/db';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load cart and wishlist from database on component mount
  useEffect(() => {
    const loadCart = () => {
      const cartItems = db.cart.get();
      setCart(cartItems);
      setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    };

    const loadWishlist = () => {
      const wishlistItems = db.wishlist.get();
      setWishlist(wishlistItems);
      setWishlistCount(wishlistItems.length);
    };

    loadCart();
    loadWishlist();
  }, []);

  // Cart functions
  const addToCart = (product) => {
    const updatedCart = db.cart.add(product);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    return updatedCart;
  };

  const updateCartItem = (productId, updates) => {
    const updatedCart = db.cart.update(productId, updates);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    return updatedCart;
  };

  const removeFromCart = (productId) => {
    const updatedCart = db.cart.remove(productId);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    return updatedCart;
  };

  const clearCart = () => {
    const updatedCart = db.cart.clear();
    setCart(updatedCart);
    setCartCount(0);
    return updatedCart;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    const updatedWishlist = db.wishlist.add(product);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    return updatedWishlist;
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = db.wishlist.remove(productId);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    return updatedWishlist;
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    const updatedWishlist = db.wishlist.clear();
    setWishlist(updatedWishlist);
    setWishlistCount(0);
    return updatedWishlist;
  };

  // Combined function to add to cart and remove from wishlist
  const addToCartAndRemoveFromWishlist = (product) => {
    const updatedCart = addToCart(product);
    removeFromWishlist(product.id);
    return updatedCart;
  };

  const value = {
    cart,
    cartCount,
    wishlist,
    wishlistCount,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    addToCartAndRemoveFromWishlist // New function
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};