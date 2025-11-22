# 🔗 TinyLink — URL Shortener (Full-Stack Project)

TinyLink is a full-stack URL shortener application built with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, **React**, **Vite**, and **TailwindCSS**.

It allows users to:
- Shorten long URLs 🔏  
- Automatically generate unique short codes  
- Track total clicks and last clicked time  
- View analytics  
- Delete links  
- Redirect using custom short URLs  

Live Demo (Frontend):  
👉 [Link to Demo](https://tiny-link-oznq.vercel.app/)

Backend API:  
👉 https://tinylink-q25x.onrender.com/api/links


---

## 🚀 Features

### **Frontend (React + Vite + TailwindCSS)**
- Beautiful and responsive UI  
- Dashboard listing all short URLs  
- “Add Link” modal to create new short URLs  
- Stats button to view details  
- Redirect on short code click  
- Fully connected to backend API  

### **Backend (Node.js + Express + Prisma)**
- REST API for creating, fetching, deleting links  
- Click counter + last clicked timestamp  
- Prisma ORM with PostgreSQL  
- Automatic redirect route like:
https://your-backend.com/abc123

- Clean and modular project structure  

### **Database**
- Hosted PostgreSQL on Neon  
- Prisma Migrations  
- Includes tables for:
- `Link`
  - `code`
  - `targetUrl`
  - `clicks`
  - `lastClicked`
  - `createdAt`

---

## 📂 Project Structure



TinyLink/
├── tinylink-backend/ # Express + Prisma backend
└── tinylink-frontend/ # React + Vite frontend


---

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- TailwindCSS
- Axios

### Backend
- Node.js
- Express
- Prisma ORM
- Neon PostgreSQL
- Cors

### Deployment
- Backend → **Render**
- Frontend → **Vercel**

---

## ⚙️ Environment Variables

### **Frontend (`.env`)**


VITE_BACKEND_URL=https://tinylink-q25x.onrender.com


### **Backend (`.env`)**


DATABASE_URL="postgresql://..."
PORT=4000


---

## ▶️ Running the Project Locally

### **Backend**
```bash
cd tinylink-backend
npm install
npx prisma migrate dev
npm run dev

Frontend
cd tinylink-frontend
npm install
npm run dev

🌐 API Endpoints
GET all links
GET /api/links

POST create a new short link
POST /api/links
body: {
  "targetUrl": "https://example.com",
  "code": "customCode" (optional)
}

DELETE link
DELETE /api/links/:code

Redirect
GET /:code → redirects to targetUrl

Dashboard with links

Add Link Modal

Stats Page

Redirect working

🙌 Author

Chandan Kumar M
GitHub: https://github.com/chandu1108

⭐ Show Your Support

If you liked this project, please ⭐ star the repo and share it!
