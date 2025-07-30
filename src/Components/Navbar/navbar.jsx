import React, { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { navLinksData } from "../../utils/navlinks";
import { ChevronDown, ChevronUp } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const exploreRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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

      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setShowExploreDropdown(null);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {!menuOpen && (
          <Link to="/" className="text-2xl font-bold text-gray-800 md:block">
            E<span className="text-red-900">-Commerce</span>
          </Link>
        )}

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinksData.map((link, index) => {
            const hasChildren = link.children && link.children.length > 0;
            const isOpen = showExploreDropdown === link.name;

            return (
              <li
                key={index}
                className="relative cursor-pointer"
                onMouseEnter={() =>
                  hasChildren && setShowExploreDropdown(link.name)
                }
                onMouseLeave={() => hasChildren && setShowExploreDropdown(null)}
              >
                {link.path ? (
                  <Link
                    to={link.path}
                    className="hover:text-blue-500"
                    onClick={() => setShowExploreDropdown(null)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <span className="hover:text-blue-500 flex items-center">
                    {link.name}
                    {hasChildren && (
                      <span className="ml-1">
                        {isOpen ? <ChevronDown /> : <ChevronUp />}
                      </span>
                    )}
                  </span>
                )}

                {hasChildren && isOpen && (
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
            );
          })}
        </ul>

        {/* Search Bar */}
        <div
          className="relative hidden md:flex items-center space-x-4"
          ref={dropdownRef}
        >
          <form onSubmit={handleSubmit} className="hidden md:flex">
            <input
              type="text"
              placeholder="Search categories..."
              onFocus={() => setShowDropdown(true)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-1 rounded-md focus:outline-none focus:ring"
            />
          </form>

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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <input
            type="text"
            placeholder="Search categories..."
            onFocus={() => setShowDropdown(true)}
            className="border px-3 py-1 rounded-md focus:outline-none w-full my-2 focus:ring"
          />

          <ul className="flex flex-col space-y-2 text-gray-700 font-medium">
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
