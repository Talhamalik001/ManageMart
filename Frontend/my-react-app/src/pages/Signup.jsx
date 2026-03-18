import React, { useState } from "react";
import "../styles/Signup.css";

import { api } from "../api";

import googleLogo from "../assets/google.png";
import facebookLogo from "../assets/facebook.png";
import instaLogo from "../assets/instagram.png";

import { useNavigate } from "react-router-dom";



const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
try {
  const response = await api.post("/auth/signup", userData);
  alert(response.data.message);
  localStorage.setItem("userEmail", userData.email); // store email
  navigate("/login"); // redirect to profile
} catch (error) {
  alert(error.response?.data?.detail || "Signup failed");
}
};


  const handleSocialSignUp = (platform) => {
    alert(`Sign Up with ${platform}`);
    // Add social signup logic here
  };

const handleLogout = () => {
  localStorage.removeItem("userEmail"); // clear email
  navigate("/login"); // redirect to login
};

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/login")}>
              Sign In
            </span>
          </p>
        </form>

        <div className="divider">
          <span>or sign up with</span>
        </div>

        <div className="social-buttons">
          <img
            src={googleLogo}
            alt="Google"
            onClick={() => handleSocialSignUp("Google")}
          />
          <img
            src={facebookLogo}
            alt="Facebook"
            onClick={() => handleSocialSignUp("Facebook")}
          />
          <img
            src={instaLogo}
            alt="Instagram"
            onClick={() => handleSocialSignUp("Instagram")}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;