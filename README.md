
# 📝 Md.X

A minimal and secure full-stack note-taking application built with **React**, **FastAPI**, and **MongoDB**. Md.X provides a clean interface for managing notes while implementing secure authentication using **JWT (JSON Web Tokens)**.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👤 One-time Administrator Setup
- 🔒 Password Hashing
- 📝 Create Notes
- ✍️MarkDown Support
- 🚫 Protected API Endpoints
- ⚡ Fast and Responsive UI
- ☁️ MongoDB Atlas Database

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- React Toastify

### Backend
- FastAPI
- Python
- Uvicorn
- Python-JOSE (JWT)
- Pwdlib (Password Hashing)

### Database
- MongoDB Atlas

---

## 📂 Project Structure

```
Farm-Todo/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/
    ├── auth/
    ├── routers/
    ├── DB/
    ├── main.py
    └── requirements.txt
```

---

## 🔐 Authentication Flow

1. Administrator account is created using the **Setup** endpoint.
2. Passwords are securely hashed before being stored.
3. User logs in with username and password.
4. FastAPI verifies the credentials.
5. A JWT access token is generated and returned.
6. React stores the token in `localStorage`.
7. Every protected request includes:

```http
Authorization: Bearer <access_token>
```

8. FastAPI validates:
   - Token signature
   - Expiration time (15 minutes)
   - User existence
9. Protected endpoints are accessible only to authenticated users.

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/Farm-Todo.git
cd Farm-Todo
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create and activate a virtual environment.

```bash
python -m venv .venv
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```env
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
ALGO=HS256
ACCESS_TOKEN_EXPIRY_TIME=30
```

Run the backend.

```bash
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install packages.

```bash
npm install
```

Change URL
( in auth folder => app_api.js, auth_api.js )
```bash
base_url = "YOUR BACKEND URL"
//for testing use
http://localhost:5173
```
Run the development server.

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/setup` | Create administrator |
| POST | `/auth/login` | Login and receive JWT |

### Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/notes/` | Get all notes |
| POST | `/notes/add` | Create note |
| PUT | `/notes/update` | Update note |
| DELETE | `/notes/delete` | Delete note |

---

## 🔒 Security

- Passwords are hashed before storage.
- JWT authentication protects all note endpoints.
- Protected routes use FastAPI dependency injection.
- Token expiration is validated on every request.
- Unauthorized requests receive appropriate HTTP status codes.

---

## 📸 Screenshots


- Login Page
![Login page img](https://github.com/Smokein96/FARM-MD-editor/blob/main/readme_img/logIn.png)
- Setup Page
![Setup page img](https://github.com/Smokein96/FARM-MD-editor/blob/main/readme_img/signIn.png)
- Notes Dashboard
![DashBoard img](https://github.com/Smokein96/FARM-MD-editor/blob/main/readme_img/signIn.png)
- Swagger Documentation

---

## 🌍 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

---

## 📚 What I Learned

- Building REST APIs with FastAPI
- JWT Authentication & Authorization
- Secure password hashing
- React API integration
- MongoDB CRUD operations
- Protected backend routes
- Environment variable management
- Deploying full-stack applications

---

## 👨‍💻 Author

**Anshu Patil**

GitHub: https://github.com/Smokein96

LinkedIn: https://www.linkedin.com/in/anshu-patil-1a1613260/

---


