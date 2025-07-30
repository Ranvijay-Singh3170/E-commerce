import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/${product.id}`}>
      <div className="border p-4 rounded shadow hover:shadow-lg transition">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">₹{product.price}</p>
        <p className="text-gray-600">{product.category}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
