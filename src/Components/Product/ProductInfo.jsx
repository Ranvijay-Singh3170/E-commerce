
import { useCart } from "../../context/CartContext";

import React from "react";

const ProductInfo = ({ product }) => {
     const { addToCart } = useCart();
  if (!product) return null; // If product is undefined

  const discountPercent = 20; // You can dynamically set this
  const discountedPrice = (product.price * (1 - discountPercent / 100)).toFixed(2);

  return (
    <div className="p-4 space-y-4">
      {/* Category & Title */}
      <div>
        <p className="text-sm font-medium text-gray-500 capitalize">{product.category}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-black">{product.title}</h1>
      </div>

      {/* Price */}
      <div className="flex gap-3 items-center">
        <h2 className="text-xl font-semibold text-gray-500 line-through">₹{product.price}</h2>
        <h2 className="text-2xl md:text-3xl font-bold text-green-600">₹{discountedPrice}</h2>
        <span className="text-sm text-red-600 font-medium">({discountPercent}% OFF)</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 line-clamp-3">{product.description}</p>

      {/* Buttons */}
      <div className="flex gap-5 pt-4">
        <button className="border-2 border-black px-6 py-2 rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-200">
          Buy Now
        </button>
        <button
    onClick={() => addToCart(product)}
    className="border-2 border-yellow-500 bg-yellow-500 text-black px-6 py-2 rounded-xl font-semibold hover:bg-yellow-600 transition-all duration-200"
  >
    Add to Cart
  </button>
      </div>
    </div>
  );
};

export default ProductInfo;
