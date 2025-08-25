// src/components/Login.jsx
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 
import loginImage from '../assets/login.image.jpg';

const Login = () => {
  const navigate = useNavigate();

  // State tanımları
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      });

      if (res.data.success) {
     if (res.data.role === "admin") {
        navigate("/product-groups"); // admin paneli
      } else {
  navigate("/products"); // normal kullanıcı ürünleri görecek
      }
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Sunucuya bağlanırken hata: " + err.message);
    }
  };

  return (
    <div className="login-container"> 
      <div className="login-box">
        <img src={loginImage} alt="Giriş Ekranı Resmi" className="login-image" />
        <h2>Kullanıcı Girişi</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-posta:</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Şifre:</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Giriş Yap</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Henüz bir hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
