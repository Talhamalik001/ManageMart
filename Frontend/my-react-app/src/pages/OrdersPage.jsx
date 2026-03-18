import React, { useEffect, useState } from "react";
import { api } from "../api";
import "../styles/orders.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders/all");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      <div className="orders-grid">
        {orders.map((o) => (
          <div key={o.id} className="order-card">
            <img src={o.product_image} width={150} />
        order    <h3>{o.product_name}</h3>
            <p>${o.product_price}</p>
            <p>{new Date(o.created_at).toLocaleString()}</p>
            <p>Status: {o.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;