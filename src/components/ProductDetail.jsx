import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext.jsx";

// Resim importları
import iphone from '../assets/ıphone15.jpg';
import samsung from '../assets/samsun25.png';
import xiaomi from '../assets/xiaomi.jpg';
import huawei from '../assets/huawei.jpg';
import google from '../assets/google.jpg';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const getImage = (name) => {
    if (!name) return "https://via.placeholder.com/200";
    
    const lower = name.toLowerCase();
    if (lower.includes("iphone")) return iphone;
    if (lower.includes("samsung")) return samsung;
    if (lower.includes("xiaomi")) return xiaomi;
    if (lower.includes("huawei")) return huawei;
    if (lower.includes("google")) return google;
    return "https://via.placeholder.com/200";
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Önce tek ürün API'sini dene
        let response;
        try {
          response = await axios.get(`https://localhost:44320/Products/products/${id}`);
        } catch (err) {
          // Tek ürün API'si yoksa, tüm ürünleri çek ve filtrele
          console.log("Tek ürün API'si bulunamadı, tüm ürünleri çekiliyor...");
          const allProductsResponse = await axios.get(`https://localhost:44320/Products/products`);
          const foundProduct = allProductsResponse.data.find(p => p.id == id);
          
          if (!foundProduct) {
            throw new Error('Ürün bulunamadı');
          }
          
          response = { data: foundProduct };
        }
        
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error("Ürün çekilemedi:", err);
        setError('Ürün bilgileri yüklenemedi');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Yükleniyor...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>{error}</div>;
  }

  if (!product) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Ürün bulunamadı</div>;
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
        
        {/* ✅ Açıklama alanı eklendi */}
        {product.description && (
          <div style={{ marginBottom: "15px" }}>
            <h4 style={{ margin: "10px 0 5px 0", color: "#000000ff" }}>Ürün Açıklaması:</h4>
            <p style={{ 
              fontSize: "16px", 
              lineHeight: "1.5", 
              color: "#000000ff",
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd"
            }}>
              {product.description}
            </p>
          </div>
        )}
        
        <p style={{ fontSize: "18px" }}>Fiyat: {Number(product.price).toLocaleString()} TL</p>
        <p style={{ fontSize: "18px" }}>Stok: {product.stock} adet</p>
        <button
          className="add-to-cart"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
            console.log("Sepete eklendi:", product.name);
          }}
          disabled={product.stock <= 0}
          style={{
            opacity: product.stock <= 0 ? 0.5 : 1,
            cursor: product.stock <= 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {product.stock <= 0 ? 'Stokta Yok' : 'Sepete Ekle'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;