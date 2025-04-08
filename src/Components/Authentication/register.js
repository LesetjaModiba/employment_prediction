import React, { useState } from "react";
import './../../Style/authentication.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/register", formData);
            setMessage(response.data.message);

            if(response.data.messag === "User registered successfully"){
                setTimeout(() => {
                    navigate("/")
                  }, 500);
            }
            setFormData({ username: "", email: "", password: "" }); // Clear form
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>Already have an account? <span style={{color:"#49EB59", cursor:"pointer"}} onClick={() => navigate("/")}>sign in</span></p>
        </div>
    );
}

export default Register;