# ToDo.io - Task Manager with JWT Authentication

A full-stack ToDo web application built with **React**, **Express**, **MongoDB**, and **JWT authentication**. Users can securely sign up, log in, and manage their personal tasks (CRUD) in a clean and responsive UI powered by **Tailwind CSS**.

---

## 🌐 Live Demo

👉 [ToDo.io on Vercel](https://to-do-io.vercel.app/)

---

## 📌 Features

- User authentication using **JWT** with secure password hashing via **bcrypt**
- Protected API routes that validate JWT tokens before allowing access
- CRUD operations on to-do items linked to authenticated users
- Clean and modern UI with **Tailwind CSS**
- Clear separation of concerns between **frontend** and **backend**

---

## 🧾 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, bcrypt

---

## 📁 Project Structure

```
ToDo.io/
├── client/     # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       ├── services/
│       ├── ui/
│       └── App.jsx
|
├── server/     # Express Backend
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
|   ├── .env
│   └── server.js
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 🛠️ Installation

### 1. Clone the repository

```sh
git clone https://github.com/IndraShikhar/ToDo.io.git
cd ToDo.io
```

### 2. Backend Setup

```sh
cd server
npm install
```

Create a .env file inside server/ and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the values with your your actual configuration.

#### Start the backend server:

```sh
npm run dev
```

### 3. Frontend Setup

```sh
cd ../client
npm install
npm run dev
```

Make sure the frontend communicates with the correct backend URL in the axios config.

## 🧪 Usage

1. Sign up with a new account.

2. Log in to your dashboard.

3. Create, update, and delete your tasks.

4. Each user’s tasks are private and protected via JWT.

## 🚧 TODO (Future Plans)

- Add due dates and reminders

- Drag-and-drop task reordering

- Task filtering by category or priority

- Light/Dark theme toggle
