// Components/product/Category.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ correct import

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Failed to fetch categories", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🗂️ All Categories</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <li
            key={category}
            className="p-3 bg-gray-100 hover:bg-blue-100 cursor-pointer rounded shadow"
            onClick={() => navigate(`/categories/${category}`)}
          >
            {category.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
