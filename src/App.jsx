import React from "react";
import Navbar from "./Components/Navbar/navbar";
import ProductList from "./Components/Product/ProductList";

import ProductDetail from "./Components/Product/ProductDetail";
import Category from "./Components/Product/Category";
import CategoryProducts from "./Components/Product/CategoryProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/search";
import CartPage from "./pages/CartPages";
import BuyPage from "./pages/BuyPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
 

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:id" element={<ProductDetail />} />

      <Route path="/buy" element={<BuyPage />} />
    
      <Route path="/cart" element={<CartPage />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/category/:name" element={<CategoryProducts />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
