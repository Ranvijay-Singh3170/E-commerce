import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageGallary from "./ImageGallary";
import ProductInfo from "./ProductInfo";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="m-10 flex gap-5">
      <ImageGallary images={product.images} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDetail;
