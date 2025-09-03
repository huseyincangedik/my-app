import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext.jsx";

// ... (resim importları)

function ProductDetail() {
  const { id } = useParams(); // URL'den gelen id'yi yakalar
  const [product, setProduct] = useState(null);
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

  useEffect(() => {
    // API isteği şimdi tek bir ürünü id'ye göre çekiyor
    axios.get(`https://localhost:44320/api/Products/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]); // id değiştiğinde tekrar çalışır

  if (!product) {
      return <p>Yükleniyor...</p>;
  }

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
      <img
        src={getImage(product.name)}
        alt={product.name}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />
      <div>
        <h2>{product.name}</h2>
        <p style={{ fontSize: "18px", float: "center" }}>Fiyat: {Number(product.price).toLocaleString()} TL</p>
        <p style={{ fontSize: "18px", float: "center" }}>Stok: {product.stock} adet</p>
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
    </div>
  );
}

export default ProductDetail;