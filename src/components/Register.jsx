import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import registerImage from '../assets/register.image.jpg.jpg';

const Register = () => {
  // Yönlendirme için useNavigate hook'unu kullanıyoruz.
  const navigate = useNavigate();

  // Form gönderildiğinde çalışacak olan fonksiyon.
  const handleSubmit = (e) => {
    // Sayfanın yeniden yüklenmesini engelliyoruz. Bu önemli.
    e.preventDefault();

    // Gerçek bir senaryoda burada sunucuya kayıt isteği göndermelisiniz.
    // fetch('API_adresiniz', { ... }).then(...) gibi bir yapı kullanabilirsiniz.
    // İstek başarılı olursa, kullanıcıyı aşağıdaki gibi yönlendiririz.

    // Kayıt işlemi tamamlandıktan sonra kullanıcıyı giriş sayfasına yönlendiriyoruz.
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={registerImage} alt="Kayıt Ekranı Resmi" className="register-image" />
        <h2>Kayıt Ol</h2>
        {/* Formun onSubmit olayına handleSubmit fonksiyonunu bağlıyoruz. */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Kullanıcı Adı:</label>
            <input type="text" id="username" />
          </div>
          <div>
            <label htmlFor="email">E-posta:</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Şifre:</label>
            <input type="password" id="password" />
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