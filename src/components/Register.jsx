import axios from "axios";
import { useState } from "react";
import "./Register.css";
import loginImage from '../assets/login.image.jpg';

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:44320/api/Auth/register", form);
      alert("Kayıt başarılı!");
      console.log(res.data);
      setForm({ username: "", email: "", password: "", role: "user" });
    } catch (err) {
      alert(err.response?.data?.message || "Hata oluştu");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={loginImage} alt="Kayıt Resmi" className="register-image" /> {/* Resim buraya eklendi */}
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
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
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}

export default Register;
