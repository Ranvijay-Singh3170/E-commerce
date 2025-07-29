import React, { useEffect, useState } from "react";

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
        <div
          key={product.id}
          className="border p-4 rounded shadow hover:shadow-lg transition"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <p className="text-gray-600">{product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
