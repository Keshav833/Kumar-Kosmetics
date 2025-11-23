<div align="center">

#  Kumar Kosmetics E-Commerce Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)

**A modern, full-stack e-commerce platform for cosmetics built with the MERN stack**

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [📚 API Docs](#-api-endpoints) • [🤝 Contributing](#-contributing)

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">

</div>

## 🌟 About

Kumar Kosmetics is a **complete e-commerce solution** featuring a beautiful customer interface, powerful admin dashboard, and smart product recommendations. Built with **MongoDB**, **Express.js**, **React**, and **Node.js**.

### 🎯 Why Kumar Kosmetics?

```
✓ Modern UI/UX Design          ✓ Secure Authentication
✓ Real-time Cart Updates       ✓ Smart Product Search
✓ Admin Dashboard             ✓ Order Management
✓ AI Skin Analyzer            ✓ Mobile Responsive
```

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🛍️ For Customers

```diff
+ Browse & search premium products
+ Shopping cart & wishlist
+ Secure authentication
+ Easy checkout process
+ Order tracking & history
+ AI-powered skin analyzer
+ Product recommendations
+ User profile management
```

</td>
<td width="50%">

### 👨‍💼 For Admins

```diff
+ Sales analytics dashboard
+ Product management (CRUD)
+ Order tracking & updates
+ Inventory management
+ User management
+ Secure admin access
+ Real-time statistics
+ Revenue tracking
```

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

</div>

<details>
<summary><b>📦 Complete Dependencies List</b></summary>

**Frontend:**
- React + Vite (Fast development)
- Tailwind CSS (Styling)
- Zustand (State management)
- React Router (Navigation)
- Axios (HTTP requests)
- Lucide React (Icons)

**Backend:**
- Node.js + Express (Server)
- MongoDB + Mongoose (Database)
- JWT (Authentication)
- bcryptjs (Password hashing)
- CORS (Cross-origin requests)

</details>

---

## 🚀 Quick Start

### 📋 Prerequisites

```bash
Node.js >= 16.0.0
MongoDB (Atlas or Local)
npm or yarn
```

### 📥 Installation

**1️⃣ Clone the repository**
```bash
git clone https://github.com/Keshav833/kumar-kosmetics-ecommerce.git
cd kumar-kosmetics-ecommerce
```

**2️⃣ Install Backend Dependencies**
```bash
cd backend
npm install
```

**3️⃣ Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### ⚙️ Configuration

**Backend Environment Variables** (`.env` in `backend` folder)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key_here
NODE_ENV=development

# Admin Credentials
ADMIN_EMAIL=admin@kumarkosmetics.com
ADMIN_PASSWORD=admin123
```

**Frontend Environment Variables** (`.env` in `frontend` folder)
```env
VITE_API_URL=http://localhost:5000/api
```

### 🎯 Run the Application

Open **two terminal windows**:

<table>
<tr>
<td width="50%">

**Terminal 1 - Backend** 🔧
```bash
cd backend
npm run dev
```
✅ Server: `http://localhost:5000`

</td>
<td width="50%">

**Terminal 2 - Frontend** 💻
```bash
cd frontend
npm run dev
```
✅ App: `http://localhost:5173`

</td>
</tr>
</table>

### 🎉 You're all set! Open your browser and visit `http://localhost:5173`

---

## 📁 Project Structure

```
kumar-kosmetics-ecommerce/
│
├── 📂 backend/
│   ├── 📂 controllers/      # Request handlers
│   ├── 📂 models/          # Database schemas
│   ├── 📂 routes/          # API routes
│   ├── 📂 middleware/      # Auth & validation
│   └── 📄 server.js        # Entry point
│
└── 📂 frontend/
    ├── 📂 src/
    │   ├── 📂 components/  # Reusable UI components
    │   ├── 📂 pages/       # Page components
    │   ├── 📂 store/       # Zustand state stores
    │   ├── 📂 lib/         # Utilities & helpers
    │   └── 📄 App.jsx      # Main app component
    └── 📄 vite.config.js   # Vite configuration
```

---

## 🔑 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Create new account | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `POST` | `/api/auth/logout` | User logout | ✅ |
| `GET` | `/api/auth/profile` | Get user profile | ✅ |

### 🛍️ Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | Get all products | ❌ |
| `GET` | `/api/products/:id` | Get product details | ❌ |
| `POST` | `/api/products` | Add new product | 👨‍💼 Admin |
| `PUT` | `/api/products/:id` | Update product | 👨‍💼 Admin |
| `DELETE` | `/api/products/:id` | Delete product | 👨‍💼 Admin |

### 📦 Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/orders` | Create new order | ✅ |
| `GET` | `/api/orders` | Get user orders | ✅ |
| `GET` | `/api/orders/:id` | Get order details | ✅ |
| `PUT` | `/api/orders/:id` | Update order status | 👨‍💼 Admin |

---

## 🚀 Deployment

<table>
<tr>
<td width="50%">

### 🔧 Backend Deployment
**Platforms:** Render, Railway, Heroku

```bash
1. Push to GitHub
2. Connect repository
3. Add environment variables
4. Deploy 🚀
```

</td>
<td width="50%">

### 💻 Frontend Deployment
**Platforms:** Vercel, Netlify

```bash
1. npm run build
2. Deploy dist folder
3. Add env variables
4. Go live! 🎉
```

</td>
</tr>
</table>

---

## 🤝 Contributing

Contributions make the open source community amazing! Any contributions are **greatly appreciated**.

<div align="center">

### How to Contribute

</div>

```bash
# 1. Fork the Project
# 2. Create your Feature Branch
git checkout -b feature/AmazingFeature

# 3. Commit your Changes
git commit -m 'Add some AmazingFeature'

# 4. Push to the Branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request 🎉
```

---

## 📄 License

<div align="center">

Distributed under the **MIT License**. See `LICENSE` for more information.

Feel free to use this project for learning or commercial purposes! 💼

</div>

---
<div align= "center">

**Made with ❤️ and lots of ☕**

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%">

</div>