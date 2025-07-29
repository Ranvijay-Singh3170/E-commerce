import React from "react"
import Navbar from "./Components/Navbar/navbar"
import ProductList from "./Components/Product/ProductList"
 
import ProductDetail from "./Components/Product/ProductDetail"
import Category from "./Components/Product/Category"
import CategoryProducts from "./Components/Product/CategoryProducts"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
 

  return (
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:id" element={<ProductDetail />} />

        <Route path="/categories"  element={<Category />} />
        <Route path="/category/:name" element={<CategoryProducts />} />

      </Routes>
  )
}

export default App
