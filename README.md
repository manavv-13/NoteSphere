# NoteSphere

## 📝 About the Project
**NoteSphere** is a web application that allows users to create, edit, and delete notes securely. The app features authentication using **JWT (JSON Web Token)** and password encryption with **bcrypt** to ensure data security.

## 🚀 Features
- ✅ User authentication (Sign Up & Login)
- ✅ Add, edit, and delete notes
- ✅ Secure authentication using JWT
- ✅ Password encryption with bcrypt
- ✅ Responsive UI using React.js & Bootstrap

## 🛠️ Tech Stack
### **Frontend:**
- ⚛️ React.js
- 🎨 Bootstrap

### **Backend:**
- 🏗️ Node.js & Express.js
- 🛢️ MongoDB (Database)
- 🔒 JWT Authentication & bcrypt for security

## 📂 Project Structure
```
NoteSphere/
│-- frontend/       # React.js Frontend
│-- backend/        # Node.js + Express.js Backend
│-- README.md       # Project Documentation
│-- .gitignore      # Ignored files (node_modules, .env, etc.)
```

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/manavv-13/NoteSphere.git
cd NoteSphere
```

### **2️⃣ Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm install
```

#### **Backend**
```sh
cd backend
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file inside the `backend/` directory and add the required environment variables:
```env
PORT=Your Backend Port
DB_URL=Your MongoDB URL
FRONTEND_URL=http://localhost:5137
JWT_SECRET=Your JWT Secret Key
```

### **4️⃣ Run the Project**
#### **Start Backend**
```sh
cd backend
npm start
```

#### **Start Frontend**
```sh
cd frontend
npm start
```

The application will be running on **http://localhost:5137**.

## 🔥 Future Enhancements
- 🌟 Add user profile management
- 🌟 Implement real-time collaboration on notes
- 🌟 Dark mode support

🎉 **Happy Coding!** 🚀

