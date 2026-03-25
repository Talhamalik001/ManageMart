import React, { useEffect, useState } from "react";
import { api } from "../api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  return (
    <div className="dashboard">

      {/* 🔥 HERO / BANNER */}
      <div className="hero">
        <h1>Welcome to My Shop</h1>
        <p>Best Deals | Best Prices</p>
      </div>

      {/* 🔥 CATEGORY BAR */}
      <div className="categories">
        <span>Electronics</span>
        <span>Fashion</span>
        <span>Mobiles</span>
        <span>Laptops</span>
        <span>Accessories</span>
      </div>

      {/* 🔥 PRODUCTS */}
      <div className="products-grid">
        {products.map((p, i) => (
          <div className="card" key={i}>
            <img src={p.image} alt="" />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <h4>${p.price}</h4>

            <button
              className="buy-btn"
              
              onClick={() => navigate("/checkout", { state: p })} 
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;