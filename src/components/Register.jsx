import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import registerImage from '../assets/register.image.jpg.jpg';

const Register = () => {
  const navigate = useNavigate();

  // Form verilerini tutmak için state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Input değişikliklerini yakalıyoruz
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Form gönderilince çalışacak
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend'e POST isteği atıyoruz
      const res = await axios.post("http://localhost:5000/api/register", formData);
      alert(res.data.message); // backend'den gelen mesajı göster
      navigate('/login'); // başarılıysa login sayfasına yönlendir
    } catch (err) {
      alert("Kayıt başarısız! " + (err.response?.data?.error || ""));
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={registerImage} alt="Kayıt Ekranı Resmi" className="register-image" />
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Kullanıcı Adı:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-posta:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Kayıt Ol</button>
        </form>
        <p>
          Zaten bir hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
