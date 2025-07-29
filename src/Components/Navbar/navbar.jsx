import React, { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fetch categories
  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category) => {
    navigate(`/category/${category}`);
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="text-2xl font-bold text-gray-800">
          E<span className="text-red-900">-Commerce</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li className="hover:text-blue-500 cursor-pointer">Men</li>
          <li className="hover:text-blue-500 cursor-pointer">Women</li>
          <li className="hover:text-blue-500 cursor-pointer">Kids</li>
          <li><Link to="/categories" className="hover:text-blue-500">Category</Link></li>
        </ul>

        {/* Search + Dropdown */}
        <div className="relative hidden md:flex items-center space-x-4" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search for products Categories wise..."
            onFocus={() => setShowDropdown(true)}
            className="border px-3 py-1 rounded-md focus:outline-none focus:ring"
          />

          {showDropdown && (
            <ul className="absolute top-10 left-0 bg-white border rounded-md w-60 max-h-60 overflow-y-auto shadow-lg z-50">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer capitalize"
                >
                  {category}
                </li>
              ))}
            </ul>
          )}

          <FaShoppingCart className="text-xl text-gray-700 cursor-pointer" />
        </div>

        {/* Hamburger - Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-3 text-gray-700 font-medium">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li className="hover:text-blue-500">Men</li>
            <li className="hover:text-blue-500">Women</li>
            <li className="hover:text-blue-500">Kids</li>
            <li><Link to="/categories" className="hover:text-blue-500">Category</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
