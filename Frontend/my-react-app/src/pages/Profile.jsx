import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // State for user
  const [user, setUser] = useState({
    name: "John Doe",
    role: "Admin",
    phone: "",
    city: "",
    state: "California",
    country: "USA",
    cnic: "",
    profilePic: null,
  });

  // Get email from localStorage
  const userEmail = localStorage.getItem("userEmail") || "";

  // Fetch user profile on mount
  useEffect(() => {
    if (!userEmail) return; // Agar email na mile, fetch na kare

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/user/profile/${userEmail}`);
        // setUser(response.data);
        setUser({
  name: response.data.name || "",
  role: response.data.role || "",
  phone: response.data.phone || "",
  city: response.data.city || "",
  state: response.data.state || "",
  country: response.data.country || "",
  cnic: response.data.cnic || "",
  profilePic: response.data.profilePic || null,
});
      } catch (error) {
        // alert(error.response?.data?.detail || "Failed to fetch profile");
        console.error(error);
alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [userEmail]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      const response = await api.put(`/user/profile/${userEmail}`, user);
      alert(response.data.message || "Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to update profile");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };
console.log("USER DATA:", user);
  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>My App</h2>
        <ul>
          <li className="active">Profile</li>
           <li onClick={() => navigate("/dashboard")}>Dashboard</li>
           <li onClick={() => navigate("/videos")}>Reels</li>
          <li>Settings</li>
        </ul>
        <button className="logout-btn-sidebar" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      {/* npx neonctl@latest init */}

      {/* Main Content */}
      <main className="profile-main">
        <h1>User Profile</h1>
        <div className="profile-card">
          {/* Left: Profile Picture */}
          <div className="profile-left">
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="profile-pic"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="upload-btn"
            />
          </div>

          {/* Right: User Details */}
          <div className="profile-right">
            <div className="profile-detail">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="profile-detail">
              <label>Role</label>
              <input type="text" value={user.role || ""} disabled />
            </div>

            <div className="profile-detail">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone || ""}
                placeholder="Enter phone"
                onChange={handleChange}
              />
            </div>

            <div className="profile-detail">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={user.city || ""}
                placeholder="Enter city"
                onChange={handleChange}
              />
            </div>

            <div className="profile-detail">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={user.state || ""}
                onChange={handleChange}
              />
            </div>

            <div className="profile-detail">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={user.country || ""}
                onChange={handleChange}
              />
            </div>

            <div className="profile-detail">
              <label>CNIC</label>
              <input
                type="text"
                name="cnic"
                value={user.cnic || ""}
                placeholder="Enter CNIC"
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleProfileUpdate}
              className="update-btn"
              style={{ marginTop: "10px" }}
            >
              Update Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;