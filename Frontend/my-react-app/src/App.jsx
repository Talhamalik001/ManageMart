import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import VideoFeed from "./pages/VideoFeed";
import Checkout from "./pages/Checkout";
import OrdersPage from "./pages/OrdersPage";


function App() {
  const isLoggedIn = !!localStorage.getItem("userEmail"); // check login

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/profile" : "/login"} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       <Route path="/profile" element={<ProfilePage />} />
        

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/videos" element={<VideoFeed />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;

