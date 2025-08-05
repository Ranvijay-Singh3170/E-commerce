import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

import { navLinksData } from '../../utils/navlinks';

const DesktopNav = () => {
      const [showExploreDropdown, setShowExploreDropdown] = useState(null);
      const exploreRef = useRef(null);

      useEffect(() => {
        const handleClickOutside = (event) => {
    
          if (exploreRef.current && !exploreRef.current.contains(event.target)) {
            setShowExploreDropdown(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

  return (
    <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {navLinksData.map((link, index) => {
            const hasChildren = link.children && link.children.length > 0;
            const isOpen = showExploreDropdown === link.name;

            return (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => hasChildren && setShowExploreDropdown(link.name)}
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
                  <span className="hover:text-blue-500 flex items-center cursor-pointer">
                    {link.name}
                    {hasChildren && (
                      <span className="ml-1">
                        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </span>
                    )}
                  </span>
                )}

                {hasChildren && isOpen && (
                  <ul className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-md w-40 z-50">
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
  )
}

export default DesktopNav