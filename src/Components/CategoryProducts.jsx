import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${name}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, [name]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">{name} Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-md p-3 shadow hover:shadow-lg"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
            <p className="text-red-600 font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
