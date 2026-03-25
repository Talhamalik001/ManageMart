import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate , Link} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import VideoFeed from "./pages/VideoFeed";
import Checkout from "./pages/Checkout";
import OrdersPage from "./pages/OrdersPage";

import Upload from "./pages/Upload";
import VFeed from "./pages/VFeed";

function App() {
  const isLoggedIn = !!localStorage.getItem("userEmail"); // check login

  return (
    <Router>
       
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/profile" : "/login"} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/videos" element={<VideoFeed />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/video" element={<VFeed />} />
        
      </Routes>
    </Router>
  );
}

export default App;

