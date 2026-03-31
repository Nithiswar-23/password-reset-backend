# 🔐 Password Reset Flow – Backend

## 🚀 Live API

👉 https://your-render-backend-url.onrender.com

---

## 📌 Overview

This is the backend of the Password Reset Flow application.
It handles user registration, password reset token generation, and password update securely.

---

## ✨ Features

* User Registration
* Forgot Password (Generate reset token)
* Reset Password using token
* Token expiration handling
* Password hashing using bcrypt
* MongoDB database integration

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* bcryptjs
* crypto
* nodemailer (optional)

---

## 📂 Project Structure

```
backend/
├── server.js
├── .env
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── utils/
│   └── sendEmail.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repository

```
git clone https://github.com/YOUR_USERNAME/password-reset-backend.git
```

### 2️⃣ Navigate

```
cd backend
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Create .env file

```
PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL=your_email@gmail.com
PASSWORD=your_app_password
FRONTEND_URL=https://password-reset-1.netlify.app
```

### 5️⃣ Run server

```
node server.js
```

---

## 🔗 API Endpoints

### 🔹 Register User

POST `/api/auth/register`

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

---

### 🔹 Forgot Password

POST `/api/auth/forgot-password`

```json
{
  "email": "user@gmail.com"
}
```

✔ Generates reset token
✔ Returns reset link

---

### 🔹 Reset Password

POST `/api/auth/reset-password/:token`

```json
{
  "password": "newpassword"
}
```

✔ Validates token
✔ Updates password

---

## 🔐 Security

* Passwords are hashed using bcrypt
* Token expires after 10 minutes
* Token is removed after successful reset

---

## 🧪 Testing

* Use Postman or frontend
* Reset link is returned in response for testing

---

## ⚠️ Notes

* MongoDB Atlas is recommended

---

## 👨‍💻 Author

**Nithiswar B**
