import React, { useState, useEffect } from "react";
import "../styles/admin.css";
import { api } from "../api";

const AdminDashboard = () => {
  
  const [video, setVideo] = useState({
  description: "",
  video_url: ""
});


const [videos, setVideos] = useState([]);

const fetchVideos = async () => {
  try {
    const res = await api.get("/videos");
    setVideos(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchUsers();
  fetchProducts();
  fetchVideos(); // ✅ ADD
}, []);

const handleVideo = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    setVideo({ ...video, video_url: reader.result });
  };

  reader.readAsDataURL(file);
};

const handleAddVideo = async () => {
  try {
    await api.post("/videos", video);
    alert("Video Added");
    fetchVideos();

    setVideo({
      description: "",
      video_url: ""
    });
  } catch (err) {
    console.error(err);
  }
};


const handleDeleteVideo = async (id) => {
  try {
    await api.delete(`/videos/${id}`);
    fetchVideos();
  } catch (err) {
    console.error(err);
  }
};
   
    
  const [users, setUsers] = useState([]);


  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/all");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/user/${email}`);
      setUsers(users.filter((u) => u.email !== email));
    } catch (err) {
      console.error(err);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProduct({ ...product, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleAddProduct = async () => {
    try {
      await api.post("/products", product);
      alert("Product Added");
      fetchProducts();

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (index) => {
    try {
      await api.delete(`/products/${index}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="user-count">Total Users: {users.length}</div>
      </div>

      {/* USER TABLE */}
      <div className="table-card">
        <h3>User Management</h3>
        <table>
  
          <thead>
  <tr>
    <th>Name</th>
    <th>Joined</th>
    <th>Status</th>
    <th>Payment</th>
    <th>Action</th>
  </tr>
</thead>

<tbody>
  {users.map((user) => (
    <tr key={user.email}>
      <td>{user.name}</td>
      <td>{user.joined}</td>
      <td><span className="status">{user.status}</span></td>
      <td><span className="unpaid">{user.payment}</span></td>
      <td>
        <button
          className="delete-btn"
          onClick={() => handleDelete(user.email)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* PRODUCT FORM */}
      <div className="product-form">
        <h2>Add Product</h2>

        <input placeholder="Name" value={product.name}
          onChange={(e)=>setProduct({...product, name:e.target.value})}
        />

        <input placeholder="Price" value={product.price}
          onChange={(e)=>setProduct({...product, price:e.target.value})}
        />

        <input placeholder="Category" value={product.category}
          onChange={(e)=>setProduct({...product, category:e.target.value})}
        />

        <textarea placeholder="Description" value={product.description}
          onChange={(e)=>setProduct({...product, description:e.target.value})}
        />

        <input type="file" onChange={handleImage} />

        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* video form  */}
      <div className="product-form">
  <h2>Add Video</h2>

  <textarea
    placeholder="Description"
    value={video.description}
    onChange={(e) =>
      setVideo({ ...video, description: e.target.value })
    }
  />

  <input type="file" onChange={handleVideo} />

  <button onClick={handleAddVideo}>Add Video</button>
</div>

      {/* PRODUCT LIST */}
      <div className="products-grid">
        {products.map((p, i) => (
          <div className="card" key={i}>
            <img src={p.image} alt="" />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <h4>${p.price}</h4>
            <button className="delete-btn" onClick={() => handleDeleteProduct(i)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="products-grid">
  {videos.map((v) => (
    <div className="card" key={v.id}>
      
     <video
  width="100%"
  autoPlay
  muted
  loop
  playsInline
>
  <source src={v.video_url} type="video/mp4" />
</video>

      <p>{v.description}</p>

      <button
        className="delete-btn"
        onClick={() => handleDeleteVideo(v.id)}
      >
        Delete
      </button>

    </div>
  ))}
</div>

    </div>
  );
};

export default AdminDashboard;

