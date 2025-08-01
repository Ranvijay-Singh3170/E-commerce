import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      {/* Only wrap image/title inside Link */}
      <Link to={`/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />
        </Link>
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">₹{product.price}</p>
        <p className="text-gray-600">{product.category}</p>
        <button
        onClick={() => onAddToCart(product)}
        className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>

      {/* Add to Cart button outside the Link */}
      
    </div>
  );
};

export default ProductCard;
