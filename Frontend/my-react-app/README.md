# 🚀 Full Stack E-Commerce Platform (React + FastAPI + Stripe)

A complete full-stack e-commerce platform built using **React (Vite)** for frontend and **FastAPI** for backend.
This project demonstrates modern web development practices including authentication, product management, payment processing, caching, and API design.

---

## 📌 Overview

This project is designed as a **learning-based full-stack application** with real-world features such as:

* User authentication (email + social login)
* Product management system
* Stripe payment integration
* Order management
* Video content feature
* Backend caching for performance optimization

---

## 🧱 Tech Stack

### 🔹 Frontend

* React (Vite)
* React Router DOM
* Axios
* CSS (Custom Styling)

### 🔹 Backend

* FastAPI
* SQLAlchemy ORM
* PostgreSQL (Neon DB)
* Pydantic Schemas

### 🔹 External Services

* Stripe (Payments)
* Google OAuth
* Facebook OAuth
* Instagram OAuth

---

## 📂 Complete Project Structure

```
Backend/
│── main.py
│── database.py
│── .env
│
├── models/
│   ├── user.py
│   ├── product.py
│   └── video.py
│
├── schemas/
│   ├── user.py
│   ├── product.py
│   └── video.py
│
├── routes/
│   ├── auth.py
│   ├── user.py
│   ├── product.py
│   ├── video.py
│   ├── order.py
│   ├── google_auth.py
│   ├── facebook_auth.py
│   └── instagram_auth.py
│
├── services/
│   └── auth.py
│
├── utils/
│   └── auth.py
│
└── venv/


Frontend/my-react-app/
│── public/
│── src/
│   ├── api/
│   │   └── index.jsx
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── VideoFeed.jsx
│   │   └── Notification.jsx
│   │
│   ├── styles/
│   │   ├── admin.css
│   │   ├── dashboard.css
│   │   ├── checkout.css
│   │   ├── orders.css
│   │   ├── login.css
│   │   ├── signup.css
│   │   ├── profile.css
│   │   └── video.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
│── index.html
│── package.json
│── .env
│── eslint.config.js
```

---

## ✨ Features

### 👤 User Features

* User Signup & Login
* Profile Management
* View & Browse Products
* Secure Checkout
* View Order History

### 🛠️ Admin Features

* View All Users
* Delete Users
* Add / Update / Delete Products

### 🎥 Media Features

* Upload Videos
* View Video Feed

### 🔐 Authentication

* Email & Password Login
* Google OAuth Login
* Facebook OAuth Login
* Instagram OAuth Login

### 💳 Payment System

* Stripe Payment Integration (Test Mode)
* Payment Intent API
* Secure checkout flow

---

## ⚙️ Installation & Setup

---

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 🔹 2. Backend Setup (FastAPI)

```bash
cd Backend
python -m venv venv
source venv/Scripts/activate   # Windows
pip install -r requirements.txt
```

#### ▶ Run Backend Server

```bash
uvicorn main:app --reload --port 9000
```

👉 Backend URL:
http://localhost:9000

👉 Swagger Docs:
http://localhost:9000/docs

---

### 🔹 3. Frontend Setup (React + Vite)

```bash
cd Frontend/my-react-app
npm install
npm run dev
```

👉 Frontend URL:
http://localhost:5173

---

## 🔐 Environment Variables

### Backend `.env`

```
DATABASE_URL=your_neon_database_url
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
```

---

## 💳 Stripe Testing

Use the following test card:

```
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any
```

⚠️ This is test mode — no real transactions are processed.

---

## 📡 Complete API Reference

---

### 🔑 Authentication APIs

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

---

### 👤 User APIs

| Method | Endpoint                    | Description    |
| ------ | --------------------------- | -------------- |
| GET    | `/api/user/all`             | Get all users  |
| GET    | `/api/user/profile/{email}` | Get profile    |
| PUT    | `/api/user/profile/{email}` | Update profile |
| DELETE | `/api/user/{email}`         | Delete user    |

---

### 📦 Product APIs

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| GET    | `/api/products/`     | Get all products |
| POST   | `/api/products/`     | Add product      |
| GET    | `/api/products/{id}` | Get product      |
| PUT    | `/api/products/{id}` | Update product   |
| DELETE | `/api/products/{id}` | Delete product   |

---

### 🛒 Order & Payment APIs

| Method | Endpoint                            | Description           |
| ------ | ----------------------------------- | --------------------- |
| POST   | `/api/orders/create-payment-intent` | Create Stripe payment |
| POST   | `/api/orders/place-order`           | Save order            |
| GET    | `/api/orders/all`                   | Get all orders        |

---

### 🎥 Video APIs

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| GET    | `/api/videos/`     | Get videos   |
| POST   | `/api/videos/`     | Add video    |
| DELETE | `/api/videos/{id}` | Delete video |

---

### 🌐 Social Authentication APIs

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/api/google/login`       | Google login       |
| GET    | `/api/google/callback`    | Google callback    |
| GET    | `/api/facebook/login`     | Facebook login     |
| GET    | `/api/facebook/callback`  | Facebook callback  |
| GET    | `/api/instagram/login`    | Instagram login    |
| GET    | `/api/instagram/callback` | Instagram callback |

---

### 🔒 Protected Route

| Method | Endpoint                   | Description      |
| ------ | -------------------------- | ---------------- |
| GET    | `/api/protected/protected` | Secured endpoint |

---

## ⚡ Performance Optimization

* Backend caching using `functools.lru_cache`
* Reduced database calls (Neon DB optimized)
* Faster API response times

---

## 🐞 Troubleshooting

### ❌ Blank Page (React)

* Check browser console
* Restart Vite server
* Clear cache

### ❌ API Not Working

* Ensure backend is running on port 9000
* Check correct API URL

### ❌ Stripe Error

```bash
pip install stripe
```

---

## 🚀 Future Enhancements

* JWT Authentication
* Role-Based Authorization
* Redis Caching
* Cloud Deployment
* Docker Support

---

## 👨‍💻 Author

**Talha**
Full Stack Developer (Learning Project 🚀)

---

## ⭐ Contribution & Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork the project
* 🤝 Contribute

---

## 📜 License

This project is for learning purposes.

---
