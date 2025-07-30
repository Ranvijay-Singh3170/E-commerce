import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]); // state for data
  const [loading, setLoading] = useState(true); // loading spinner

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); // API returns { products: [...] }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading....</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
       <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
