import React, { useState } from "react";
import './../../Style/authentication.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
            const response = await axios.post("http://localhost:4000/login", formData);
            setMessage(response.data.message);

            if (response.data.message === "Login successful") {
                setTimeout(() => {
                    localStorage.setItem('token', response.data.token); // Save JWT
                    navigate("/dashboard"); // Redirect to dashboard or another route
                }, 500);
            }

            setFormData({ email: "", password: "" }); // Clear form
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="register-container">
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit} className="register-form">
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
                <button type="submit">Sign in</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>
                Don't have an account?{" "}
                <span
                    style={{ color: "#49EB59", cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                >
                    Sign up
                </span>
            </p>
        </div>
    );
};

export default Login;
