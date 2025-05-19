# 📚 Book Review REST API

A RESTful API built with Node.js, Express, and MongoDB that allows users to register, login, create books, write reviews, and search for books. Authenticated using JWT.

---

## ✅ Features

- User Registration and Login
- JWT-based Authentication
- Add, Update, Delete Books (Authenticated)
- Add and Delete Reviews for Books (Authenticated)
- Search Books by Title, Author, or Genre

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Config**: dotenv

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
 ```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root directory. Use the following format:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```
## 🚀 How to Run Locally
```bash
nodemon server.js
```
## 🛠️ Example API Requests (using Postman)
### 1. Signup
Method: POST

URL: http://localhost:5000/api/auth/signup

Body (JSON):

```bash
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```
### 2. Login

Method: POST

URL: http://localhost:5000/api/auth/login

Body (JSON):

```bash
{
  "email": "alice@example.com",
  "password": "password123"
}
```
### 3. Create a Book

Method: POST

URL: http://localhost:5000/api/books

Headers:
```bash
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

Body (JSON):
```bash
{
  "title": "Normal People",
  "author": "Sally Rooney",
  "genre": "Fiction",
  "description": "A story about two people who don't know how to communicate with each other."
}
```
### 4. Get All Books

Method: GET

URL: http://localhost:5000/api/books

Optional Query Params:

- author=Rooney

- genre=Fiction

- page=1

- limit=5
### 5. Get Book Details

Method: GET

URL: http://localhost:5000/api/books/:id

### 6. Add a Review

Method: POST

URL: http://localhost:5000/api/reviews/books/:id/reviews

Headers:
```bash
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

Body (JSON):
```bash
{
  "rating": 5,
  "comment": "An inspiring tale about purpose."
}
```
### 7. Update a Review

Method: POST

URL: http://localhost:5000/api/reviews/:reviewId

Headers:
```bash
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

Body (JSON):
```bash
{
  "rating": 4,
  "comment": "Still great, slightly less magical on a second read."
}
```
### 8. Delete a Review

Method: DELETE

URL: http://localhost:5000/api/reviews/:reviewId

Headers:
```bash
Authorization: Bearer <your_jwt_token>
```
### 9. Search Books

Method: GET

URL: http://localhost:5000/api/search?q=alchemist
