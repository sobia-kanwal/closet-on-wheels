"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart (localStorage or DB depending on login)
  const loadCart = async () => {
    if (session?.user) {
      // Logged in → get from DB
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setCart(data);
        setCartCount(data.reduce((t, item) => t + item.quantity, 0));
      }
    } else {
      // Guest → load from localStorage
      const data = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(data);
      setCartCount(data.reduce((t, item) => t + item.quantity, 0));
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (session?.user) {
      // Logged in → save to DB
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
    } else {
      // Guest → save to localStorage
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
    }
    await loadCart();
  };

  const removeFromCart = async (idOrProductId) => {
    if (session?.user) {
      // Logged in → delete from DB
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: idOrProductId }),
      });
    } else {
      // Guest → delete from localStorage
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const updated = stored.filter((item) => item.productId !== idOrProductId);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
    await loadCart();
  };

  useEffect(() => {
    loadCart();
  }, [session]);

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, reload: loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
