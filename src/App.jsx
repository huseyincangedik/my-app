import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import hcgLogo from './assets/hcg-logo.png.png'; 


import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

import Login from './components/Login.jsx';
import Register from './components/register.jsx'; 
import ProductGroupList from './components/ProductGroupList.jsx';
import ProductGroupForm from './components/ProductGroupForm.jsx';
//import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <div>
        {/* Ana Menü */}
        <nav className="menu">
          <ul>
            <li>
              <Link to="/"><img src={hcgLogo} alt="HCG Teknoloji" className="site-logo" /></Link>
            </li>
            <li><Link to="/login">Giriş Yap</Link></li>
            <li><Link to="/register">Kayıt Ol</Link></li>
            <li><Link to="/product-groups">Ürün Grupları</Link></li>
            <li><Link to="/products">Ürünler</Link></li>
          </ul>

          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Ara..." />
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
            <Route path="/products" element={<ProductList products={products} orders={orders} />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
          </Routes>
        </div>

        {/* Axios ile çekilen veriler (örnek tablo) */}
        <div className="container"> 
          <h1>Products</h1>
          <ul>
            {products.map(p => (
              <li key={p.id}>{p.name} - {p.price}₺</li>
            ))}
          </ul>

          <h1>Orders</h1>
          <ul>
            {orders.map(o => (
              <li key={o.id}>Order #{o.id} - Product ID: {o.product_id} - Qty: {o.quantity}</li>
            ))}
          </ul>
        </div>
      </div>
    </Router>
  );
}

export default App;
