import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList.jsx";
import "./ProductList.css"

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:44320/ProductForecast/products"); 
      console.log("API'den gelen veri:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Ürünler çekilemedi:", err);
    }
  };
  fetchProducts();
}, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Ürün ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProductList products={products} searchTerm={searchTerm} />
    </div>
  );
}

export default ProductsPage;
