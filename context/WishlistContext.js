"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = async () => {
    if (session?.user) {
      const res = await fetch("/api/wishlist");
      if (res.ok) {
        const data = await res.json();
        setWishlist(data);
      }
    } else {
      const saved = JSON.parse(localStorage.getItem("guest_wishlist") || "[]");
      setWishlist(saved);
    }
  };

  const addToWishlist = async (productId) => {
    if (session?.user) {
      await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    } else {
      const updated = [...wishlist, { productId }];
      localStorage.setItem("guest_wishlist", JSON.stringify(updated));
      setWishlist(updated);
    }
    await loadWishlist();
  };

  const removeFromWishlist = async (productId) => {
    if (session?.user) {
      await fetch(`/api/wishlist`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    } else {
      const updated = wishlist.filter((item) => item.productId !== productId);
      localStorage.setItem("guest_wishlist", JSON.stringify(updated));
      setWishlist(updated);
    }
    await loadWishlist();
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId);

  useEffect(() => {
    loadWishlist();
  }, [session]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
