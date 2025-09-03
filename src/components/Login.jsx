import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; // useNavigate'ı içe aktardık
import loginImage from '../assets/login.image.jpg';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // useNavigate kancasını kullanıma hazırladık

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:44320/api/Auth/login", form);
      alert(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data));
      setForm({ email: "", password: "" });
      
      // Başarılı giriş sonrası yönlendirme
      navigate('/products'); 
    } catch (err) {
      alert(err.response?.data?.message || "Giriş başarısız!");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
         <img src={loginImage} alt="Giriş Resmi" className="login-image" /> {/* Resim buraya eklendi */}
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default Login;