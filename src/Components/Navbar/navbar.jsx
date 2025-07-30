import React, { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { navLinksData } from "../../utils/navlinks";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const exploreRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  // Fetch categories on mount
  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setShowExploreDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category) => {
    navigate(`/category/${category}`);
    setShowDropdown(false);
    setShowExploreDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          E<span className="text-red-900">-Commerce</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinksData.map((link, index) => (
            <li
              key={index}
              className="relative cursor-pointer"
              onMouseEnter={() => setShowExploreDropdown(link.name)}
              onMouseLeave={() => setShowExploreDropdown(null)}
            >
              {link.path ? (
                <Link to={link.path} className="hover:text-blue-500">
                  {link.name}
                </Link>
              ) : (
                <span className="hover:text-blue-500">{link.name}</span>
              )}

              {/* Dropdown logic */}
              {link.children && showExploreDropdown === link.name && (
                <ul className="absolute top-8 left-0 bg-white border rounded-md shadow-md w-40 z-50">
                  {link.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className="block px-4 py-2 hover:bg-gray-100 capitalize"
                        onClick={() => setShowExploreDropdown(null)}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        

        {/* Search + Dropdown */}
        <div
          className="relative hidden md:flex items-center space-x-4"
          ref={dropdownRef}
        >
          <input
            type="text"
            placeholder="Search categories..."
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

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <input
            type="text"
            placeholder="Search categories..."
            onFocus={() => setShowDropdown(true)}
            className="border px-3 py-1 rounded-md focus:outline-none w-full my-2 focus:ring"
          />
          
           <ul className="md:hidden:flex space-x-6 text-gray-700 font-medium">
          {navLinksData.map((link, index) => (
            <li
              key={index}
              className="relative cursor-pointer"
              onMouseEnter={() => setShowExploreDropdown(link.name)}
              onMouseLeave={() => setShowExploreDropdown(null)}
            >
              {link.path ? (
                <Link to={link.path} className="hover:text-blue-500">
                  {link.name}
                </Link>
              ) : (
                <span className="hover:text-blue-500">{link.name}</span>
              )}

              {/* Dropdown logic */}
              {link.children && showExploreDropdown === link.name && (
                <ul className="absolute top-8 left-0 bg-white border rounded-md shadow-md w-40 z-50">
                  {link.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className="block px-4 py-2 hover:bg-gray-100 capitalize"
                        onClick={() => setShowExploreDropdown(null)}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
