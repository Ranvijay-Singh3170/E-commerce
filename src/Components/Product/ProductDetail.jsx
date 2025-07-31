import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallary";
import ProductInfo from "./ProductInfo";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <p className="text-center py-10 text-lg text-gray-500">Loading...</p>;

  if (!product)
    return <p className="text-center py-10 text-lg text-red-500">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
      <div className="w-full lg:w-1/2">
        <ImageGallery images={product.images} />
      </div>

      <div className="w-full lg:w-1/2">
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
