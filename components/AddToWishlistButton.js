"use client";
import { useWishlist } from "../context/WishlistContext";
import { useEffect, useState } from "react";

export default function AddToWishlistButton({ product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleToggleWishlist = async () => {
    if (isLiked) {
      await removeFromWishlist(product.id);
      setIsLiked(false);
    } else {
      await addToWishlist(product.id);
      setIsLiked(true);
    }
  };

  return (
    <button onClick={handleToggleWishlist}>
      {isLiked ? "❤️ Remove" : "🤍 Add"}
    </button>
  );
}
