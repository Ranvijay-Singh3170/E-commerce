import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const loadRazorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Check internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_dM0Y0bLPyvpWgR", // Replace with your live key in production
      amount: product.price * 100,
      currency: "INR",
      name: "Radoms Digital",
      description: `Payment for ${product.title}`,
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert("Payment successful!");
        console.log("Radoms Digital response", response);
      },
      prefill: {
        name: "Ranvijay Singh",
        email: "customer@example.com",
        contact: "9792563170",
      },
      notes: {
        address: "Radoms Digital Pvt Ltd Gaur City Greater Noida",
      },
      theme: {
        color: "#6366F1", // Tailwind Indigo-500
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl w-full max-w-3xl mx-auto border border-gray-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight tracking-tight">{product.title}</h2>
      <p className="text-2xl text-indigo-600 font-semibold mb-6">₹{product.price}</p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={loadRazorpay}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out  w-full sm:w-auto"
        >
          Buy Now
        </button>
        <button
          onClick={() => addToCart(product)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-md transition duration-300 w-full sm:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
