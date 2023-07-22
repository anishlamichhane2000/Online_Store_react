import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Component/Homepage';
import SearchPage from './Component/SearchPage';
import ProductDetailsPage from './Component/ProductDetailsPage';
import { CartProvider } from './Component/CartContext'; // Import using curly braces
import ShoppingCart from './Component/ShoppingCart';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/products" element={<ProductDetailsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;