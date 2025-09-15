"use client";
import { useWishlist } from "../context/WishlistContext";
import { useEffect, useState } from "react";

export default function AddToWishlistButton({ product, className = "" }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isLiked, setIsLiked] = useState(false);
  const productId = product?.id ?? product?.productId;

  useEffect(() => {
    if (!productId) return;
    setIsLiked(isInWishlist(productId));
  }, [productId, isInWishlist]);

  const handleToggleWishlist = async (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    if (!productId) return;

    if (isLiked) {
      await removeFromWishlist(productId);
      setIsLiked(false);
    } else {
      await addToWishlist(productId);
      setIsLiked(true);
    }
  };

  return (
    <button
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
      onClick={handleToggleWishlist}
      className={`p-2 rounded-full bg-white/80 hover:bg-white shadow transition ${className}`}
    >
      {/* Heart icon: filled red when liked, outline when not */}
      {isLiked ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
          <path d="M11.645 20.91l-.007-.003-.022-.01a15.247 15.247 0 01-.383-.173 25.18 25.18 0 01-4.244-2.453C4.688 16.327 2.25 13.973 2.25 10.5 2.25 8.014 4.285 6 6.75 6c1.4 0 2.637.574 3.5 1.501A4.77 4.77 0 0113.75 6c2.465 0 4.5 2.014 4.5 4.5 0 3.473-2.438 5.827-4.739 7.77a25.175 25.175 0 01-4.244 2.453 15.247 15.247 0 01-.383.173l-.022.01-.007.003a.75.75 0 01-.59 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.014-4.5-4.5-4.5-1.4 0-2.637.574-3.5 1.5-.863-.926-2.1-1.5-3.5-1.5-2.485 0-4.5 2.015-4.5 4.5 0 3.473 2.438 5.827 4.739 7.77a25.175 25.175 0 004.244 2.453c.13.06.26.118.383.173.123-.055.253-.114.383-.173a25.175 25.175 0 004.244-2.453C18.563 14.077 21 11.723 21 8.25z" />
        </svg>
      )}
    </button>
  );
}
