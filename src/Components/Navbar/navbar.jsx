import React, { useEffect, useState, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { navLinksData } from "../../utils/navlinks";
import DesktopNav from "./DesktopNav";

const Navbar = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileLoginView, setMobileLoginView] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const user =  localStorage.getItem("loggedInUser")

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setMenuOpen(false);
    setMobileLoginView(false);
    navigate("/");
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

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
    setShowExploreDropdown(null);
    setMenuOpen(false);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setShowExploreDropdown(null);
    setMenuOpen(false);
    setMobileLoginView(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          E<span className="text-red-900">-Commerce</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <DesktopNav />
          <form onSubmit={handleSubmit} ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              className="border px-3 py-1 rounded-md focus:outline-none focus:ring w-48"
            />
            {showDropdown && (
              <ul className="absolute mt-2 bg-white border rounded-md w-60 max-h-60 overflow-y-auto shadow-lg z-50">
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
          </form>

          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-2xl text-gray-800" title="Profile" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <FaSignInAlt /> Login
              </Link>
              
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-2">
          {!user ? (
            <Link to="/login">
            <button
              onClick={() => setMobileLoginView(true)}
              className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm"
            >
              Login
              
            </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
            >
              Logout
            </button>
          )}
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {mobileLoginView ? (
            <div className="bg-white rounded-lg p-4 shadow space-y-4 animate-fade-in">
              <h2 className="text-center text-xl font-semibold text-gray-800">Welcome</h2>
              <p className="text-center text-gray-500 text-sm">Sign in to continue shopping</p>
              <div className="space-y-3">
                 
                 
                <button
                  onClick={() => setMobileLoginView(false)}
                  className="block w-full text-center text-gray-500 text-sm underline mt-2"
                >
                  ← Back to Menu
                </button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className="border px-3 py-1 rounded-md focus:outline-none w-full focus:ring"
                />
              </form>

              {showDropdown && (
                <ul className="bg-white border rounded-md max-h-48 overflow-y-auto shadow-lg">
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

              <ul className="space-y-3 text-gray-700 font-medium">
                {navLinksData.map((link, index) => {
                  const hasChildren = link.children && link.children.length > 0;
                  const isOpen = showExploreDropdown === link.name;

                  return (
                    <li key={index} className="relative">
                      {hasChildren ? (
                        <>
                          <button
                            className="w-full text-left hover:text-blue-500 flex justify-between items-center"
                            onClick={() =>
                              setShowExploreDropdown(isOpen ? null : link.name)
                            }
                          >
                            {link.name}
                            <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
                          </button>
                          {isOpen && (
                            <ul className="mt-1 ml-4 space-y-1 bg-gray-100 rounded-md p-2">
                              {link.children.map((child) => (
                                <li key={child.path}>
                                  <Link
                                    to={child.path}
                                    className="block px-2 py-1 hover:bg-gray-200 rounded capitalize"
                                    onClick={() => handleLinkClick(child.path)}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          className="hover:text-blue-500 block"
                          onClick={() => handleLinkClick(link.path)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  );
                })}

                <li>
                  <Link to="/cart" className="flex items-center gap-2">
                    <FaShoppingCart />
                    Cart
                    {totalItems > 0 && (
                      <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
