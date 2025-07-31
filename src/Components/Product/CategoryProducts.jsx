import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard";

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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
