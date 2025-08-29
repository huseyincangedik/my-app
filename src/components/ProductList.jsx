import React from "react";
import { useCart } from "./CartContext.jsx";

import iphone from '../assets/ıphone15.jpg';
import samsung from '../assets/samsun25.png';
import xiaomi from '../assets/xiaomi.jpg';
import huawei from '../assets/huawei.jpg';
import google from '../assets/google.jpg';
import "./ProductList.css";

function ProductList({ products, searchTerm }) {
  const { addToCart } = useCart();

  const getImage = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("iphone")) return iphone;
    if (lower.includes("samsung")) return samsung;
    if (lower.includes("xiaomi")) return xiaomi;
    if (lower.includes("huawei")) return huawei;
    if (lower.includes("google")) return google;
    return "https://via.placeholder.com/200";
  };

  // Filtreleme (arama)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id} style={{ cursor: "pointer" }}>
            <a
              href={`/products/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={getImage(product.name)} alt={product.name} className="product-img" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{Number(product.price).toLocaleString()} TL</p>
              <p className="product-stock">Stok: {product.stock} adet</p>
            </a>

            <button
              className="add-to-cart"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                console.log("Sepete eklendi:", product.name);
              }}
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
     <h3> {filteredProducts.length === 0 && <p>Aradığınız ürün bulunamadı.</p>}</h3>
    </div>
  );
}

export default ProductList;
