import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import iphone from '../assets/ıphone15.jpg';
import samsung from '../assets/samsun25.png';
import xiaomi from '../assets/xiaomi.jpg'; 
import huawei from '../assets/huawei.jpg'; 
import google from '../assets/google.jpg'; 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getImage = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("iphone")) return iphone;
    if (lower.includes("samsung")) return samsung;
    if (lower.includes("xiaomi")) return xiaomi;
    if (lower.includes("huawei")) return huawei;
    if (lower.includes("google")) return google;
    return "https://via.placeholder.com/300";
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: "20px",}}>
      <h2>{product.name}</h2>
      <img 
        src={getImage(product.name)} 
        alt={product.name} 
        style={{ width: "400px", height: "200", marginBottom: "20px" }}
      />
      <p style={{ fontSize: "18px" }}>{product.description}</p>
      <p style={{ fontSize: "18px" }}>Fiyat: {Number(product.price).toLocaleString()} TL</p>
      <p style={{ fontSize: "18px" }}>Stok: {product.stock} adet</p>
    </div>
  );
}

export default ProductDetail;
