import React from 'react';
import { useLocation } from 'react-router-dom';

const BuyPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="text-center text-lg mt-10">
        No product selected.
      </div>
    );
  }

  const discountPercent = 20;
  const discountedPrice = (product.price * (1 - discountPercent / 100)).toFixed(2);

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
        Confirm Your Purchase
      </h1>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-white rounded-lg shadow-md p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-40 h-40 rounded-lg object-cover"
        />

        <div className="text-center md:text-left w-full">
          <h2 className="text-lg sm:text-xl font-semibold">{product.title}</h2>
          <p className="text-gray-600 text-sm">Category: {product.category}</p>
          <p className="line-through text-gray-500 text-base mt-2">₹{product.price}</p>
          <p className="text-green-600 font-bold text-xl">₹{discountedPrice}</p>

          <button className="mt-4 w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
