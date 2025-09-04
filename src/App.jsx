import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import hcgLogo from './assets/hcg-logo.png.png';
import { CartProvider } from "./components/CartContext.jsx";
import CartPage from "./components/CartPage.jsx";

import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

import Login from './components/Login.jsx';
import Register from './components/register.jsx';
import ProductGroupList from './components/ProductGroupList.jsx';
import ProductGroupForm from './components/ProductGroupForm.jsx';
import ProductForm from './components/ProductForm.jsx';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://localhost:44320/Products/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <Router>
      <CartProvider>
        <nav className="menu">
          <ul>
            <li><Link to="/"><img src={hcgLogo} alt="HCG Teknoloji" className="site-logo" /></Link></li>
            <li><Link to="/login">Giriş Yap</Link></li>
            <li><Link to="/register">Kayıt Ol</Link></li>
            <li><Link to="/product-groups">Ürün Grupları</Link></li>
            <li><Link to="/products">Ürünler</Link></li>
            <li><Link to="/cart">Sepetim</Link></li>
          </ul>

          {/* Menüde arama */}
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Ara</button>
          </form>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<h2>Ana Sayfa</h2>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product-groups" element={<ProductGroupList />} />
            <Route path="/product-groups/new" element={<ProductGroupForm />} />
            <Route path="/product-groups/edit/:id" element={<ProductGroupForm />} />
            <Route path="/products/:id" element={<ProductDetail products={products} />} />
            <Route path="/products" element={<ProductList products={products} searchTerm={searchTerm} />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
