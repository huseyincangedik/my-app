// src/components/Login.jsx
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; // useNavigate'ı ekliyoruz
import './Login.css'; 
import loginImage from '../assets/login.image.jpg';

const Login = () => {
  // Yönlendirme işlemi için useNavigate hook'unu kullanıyoruz.
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Gerçek bir uygulamada burada sunucuya giriş isteği gönderilir.
    // Eğer istek başarılı olursa...

    // Giriş başarılı olduktan sonra kullanıcıyı ana sayfaya yönlendir.
    navigate('/'); 
  };  
  return (
    <div className="login-container"> 
      <div className="login-box">
        <img src={loginImage} alt="Giriş Ekranı Resmi" className="login-image" />
        <h2>Kullanıcı Girişi</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-posta:</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Şifre:</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Giriş Yap</button>
        </form>
        <p>
          Henüz bir hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;