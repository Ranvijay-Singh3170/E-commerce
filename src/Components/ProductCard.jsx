import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Only wrap image/title inside Link */}
      <Link to={`/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-cover   transition-transform duration-300 group-hover:scale-105"
        />
        </Link>
        <div className="p-4">

          <h2 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-1 ">{product.title}</h2>
          <p className="text-sm text-gray-500 capitalize mt-1">₹{product.price}</p>
          <button onClick={()=>onAddToCart(product)} className="mt-4 w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>

      {/* Add to Cart button outside the Link */}
      
    </div>
  );
};

export default ProductCard;
