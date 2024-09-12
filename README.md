# 🎮 MystryDigit ❓ - Number Guessing Game

Welcome to **MystryDigit** – a fun and interactive Number Guessing Game with user authentication! This full-stack application uses **React (Vite)** for the frontend and **Node.js with MongoDB** for the backend, ensuring a smooth and engaging user experience. 🧑‍💻

## 🗂️ Project Structure

```
root/
│
├── backend/           # Backend code (MVC architecture)
│   ├── controllers/   # Controllers for handling requests
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   └── server.js      # Entry point for the Express server
│
└── frontend/          # Frontend code (React with Vite)
    └── src/           # React components and hooks
```

## 🚀 Tech Stack

### Frontend (React)
- **React with Vite** - for fast development ⚡
- **Axios** - for making HTTP requests 📡
- **React Hooks (useState, useEffect)** - for state and lifecycle management 🔄
- **Tailwind CSS** - for clean and responsive UI 🎨
- **Cookies** - for storing authentication data 🍪
- **Deployment**: Frontend is deployed on **Netlify** 🌍

### Backend (Node.js)
- **Express** - Node.js framework for building APIs 🚀
- **MongoDB** - for storing user data and scores 📊
- **Mongoose** - for object data modeling (ODM) with MongoDB 📂
- **JWT** - for secure authentication 🔒
- **Deployment**: Backend is deployed on **Render** 🖥️

---

## 🛠️ Setup Instructions

### Backend Setup

1. Clone the repository and navigate to the backend folder:

    ```bash
    git clone https://github.com/sample/MystryDigit.git
    cd MystryDigit/backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the backend folder with the following environment variables:

    ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:

    ```bash
    npm run start
    ```

    The backend will run at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

    The frontend will be available at `http://localhost:5173`.

---

## 🌐 Live Demo

- **Frontend (Netlify)**: [MystryDigit Frontend](https://sample-netlify-link.com)
- **Backend (Render)**: [MystryDigit Backend API](https://sample-render-link.com)

---

## 🧩 Features

- 🎮 **Game Functionality** - A number guessing game that allows users to play and accumulate scores based on performance.
- 📊 **Score Tracking** - Real-time score display and tracking of the user's highest score.
- 🏆 **High Score Feature** - Displays the highest score and triggers a confetti animation for new high scores.
- 🔒 **User Authentication** - Users can register and log in to track game data and scores.
- 🧾 **Data Fetching** - Fetch and display user past scores and high scores upon login.
- 🚀 **Full-Stack Deployment** - Frontend is deployed on Netlify, and backend on Render for seamless access.

---

Feel free to fork this repo, modify the sample links above, and have fun with MystryDigit! 🎉