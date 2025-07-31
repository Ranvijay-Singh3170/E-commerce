import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
