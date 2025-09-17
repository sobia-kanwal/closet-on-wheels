"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from API for logged-in users, localStorage for guests
  const loadWishlist = async () => {
    if (session?.user) {
      try {
        const res = await fetch("/api/wishlist");
        if (res.ok) {
          const data = await res.json();
          setWishlist(data);
        }
      } catch (error) {
        console.error("Error loading wishlist from API:", error);
      }
    } else {
      const data = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(data);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    if (session?.user) {
      return wishlist.some(item => item.productId === parseInt(productId));
    } else {
      return wishlist.some(item => item.id === productId);
    }
  };

  // Add to wishlist
  const addToWishlist = async (product) => {
    if (session?.user) {
      try {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        });
        await loadWishlist();
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (!stored.some(item => item.id === product.id)) {
        const updated = [...stored, { id: product.id, ...product }];
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setWishlist(updated);
      }
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (session?.user) {
      try {
        await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
        await loadWishlist();
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const updated = stored.filter(item => item.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlist(updated);
    }
  };

  // Combined function to add to cart and remove from wishlist
  const addToCartAndRemoveFromWishlist = async (product) => {
    await addToCart(product.id, 1);
    await removeFromWishlist(product.id);
  };

  // Load cart from API for logged-in users, localStorage for guests
  const loadCart = async () => {
    setLoading(true);
    try {
      if (session?.user) {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          setCart(data.items || data); // Handle both formats
        }
      } else {
        const data = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(data);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setCart([]); // Ensure cart is always an array
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (session?.user) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        await loadCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = stored.find((item) => item.productId === productId);
      let updated;
      if (existing) {
        updated = stored.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        updated = [...stored, { productId, quantity }];
      }
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    }
  };

  const removeFromCart = async (idOrProductId) => {
    if (session?.user) {
      try {
        await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: idOrProductId }),
        });
        await loadCart();
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const updated = stored.filter((item) => item.productId !== idOrProductId);
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    }
  };

  const updateCartItem = async (productId, updates) => {
    if (session?.user) {
      try {
        await fetch("/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, ...updates }),
        });
        await loadCart();
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    } else {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const updated = stored.map(item => 
        item.productId === productId 
          ? { ...item, ...updates }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    }
  };

  const clearCart = async () => {
    if (session?.user) {
      try {
        await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clearAll: true }),
        });
        await loadCart();
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      localStorage.setItem("cart", "[]");
      setCart([]);
    }
  };

  // Calculate cart total safely
  const getCartTotal = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 1;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  // Calculate cart count safely
  const getCartCount = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  useEffect(() => {
    loadCart();
    loadWishlist();
  }, [session]);

  // Update cartCount whenever cart changes
  useEffect(() => {
    setCartCount(getCartCount());
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart: Array.isArray(cart) ? cart : [], // Ensure cart is always an array
        cartCount,
        wishlist,
        loading,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getCartTotal, // Now a function
        reload: loadCart,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        addToCartAndRemoveFromWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);