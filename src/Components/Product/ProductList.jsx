import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { useCart } from "../../context/CartContext";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // GET addToCart FROM CONTEXT

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading....</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product)=>(
          <ProductCard key={product.id}
          product={product}
          onAddToCart={addToCart}/>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
