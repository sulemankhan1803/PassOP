#  PassOP - Your own password manager

## Overview
PassOP is a password manager built with the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to store, edit, delete, and manage passwords securely.

## Features
- Add new passwords with site URL, username, and password.
- Edit and delete stored passwords.
- Show or hide passwords for security.
- Copy credentials to the clipboard.
- Fully responsive UI with Tailwind CSS.

## Technologies Used
- Frontend: React, Tailwind CSS
- Backend: Express.js, Node.js
- Database: MongoDB
- Additional Libraries: react-toastify, uuid, body-parser, cors

## Installation & Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally

### Steps to Run the Project

#### 1. Clone the Repository
```bash
git clone https://github.com/sulemankhan1803/PassOP.git
cd passop
```

#### 2. Install Dependencies
##### Frontend
```bash
cd frontend
npm install
```
##### Backend
```bash
cd backend
npm install
```

#### 3. Start the MongoDB Server
Ensure MongoDB is running on your local machine:
```bash
mongodb --dbpath /your/db/path
```

#### 4. Start the Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:3000/`.

#### 5. Start the Frontend
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173/`.

## API Endpoints

### 1. Get All Passwords
**GET** `/`
```json
[
  { "id": "1", "site": "https://example.com", "username": "user1", "password": "password123" }
]
```

### 2. Save a Password
**POST** `/`
```json
{
  "site": "https://example.com",
  "username": "user1",
  "password": "password123"
}
```

### 3. Delete a Password
**DELETE** `/`
```json
{
  "id": "1"
}
```



