// context/CartContext.js (React Context for cart state management)
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

  // Load cart from database on component mount
  useEffect(() => {
    const loadCart = () => {
      const cartItems = db.cart.get();
      setCart(cartItems);
      setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    };

    loadCart();
  }, []);

  // Function to add item to cart
  const addToCart = (product) => {
    const updatedCart = db.cart.add(product);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    return updatedCart;
  };

  // Function to update item in cart
  const updateCartItem = (productId, updates) => {
    const updatedCart = db.cart.update(productId, updates);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    return updatedCart;
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = db.cart.remove(productId);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    return updatedCart;
  };

  // Function to clear cart
  const clearCart = () => {
    const updatedCart = db.cart.clear();
    setCart(updatedCart);
    setCartCount(0);
    return updatedCart;
  };

  // Function to get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const value = {
    cart,
    cartCount,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};