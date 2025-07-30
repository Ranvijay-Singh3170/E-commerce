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

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="m-10 flex flex-col md:flex-row gap-5">
      <ImageGallery images={product.images} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDetail;
