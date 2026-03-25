import React, { useState } from "react";
import "../styles/login.css";

import { api } from "../api";  // backend connection

// Import social icons from assets
import googleLogo from "../assets/google.png";
import facebookLogo from "../assets/facebook.png";
import instaLogo from "../assets/instagram.png";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", credentials);
      localStorage.setItem("userEmail", credentials.email); // store email
      alert(response.data.message);
      navigate("/profile"); // redirect to profile
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    }
  };

  // ---------------- Google Login ----------------
  const handleGoogleLogin = () => {
    // Directly hit backend endpoint
    window.location.href = "http://localhost:9000/api/google/login";
  };

  const handleFacebookLogin = () => {
  window.location.href = "http://localhost:9000/api/facebook/login";
};

const handleInstagramLogin = () => {
  window.location.href = "http://localhost:9000/api/instagram/login";
};
  // ---------------- Other Social Logins ----------------
  const handleSocialLogin = (platform) => {
    alert(`Login with ${platform} - Coming soon!`);
    // TODO: Integrate Facebook / Instagram OAuth later
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={credentials.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
          <p>
            Don't have an account?{" "}
            <span className="link" onClick={() => navigate("/signup")}>
              Create one
            </span>
          </p>
        </form>

        <div className="divider">
          <span>or sign in with</span>
        </div>

        <div className="social-buttons">
          <img
            src={googleLogo}
            alt="Google"
            onClick={handleGoogleLogin}
            style={{ cursor: "pointer" }}
          />
      <img
  src={facebookLogo}
  alt="Facebook"
  onClick={handleFacebookLogin}
/>
          <img
  src={instaLogo}
  alt="Instagram"
  onClick={handleInstagramLogin}
/>
        </div>
      </div>
    </div>
  );
};

export default Login;