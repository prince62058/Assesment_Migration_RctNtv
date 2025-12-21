# 🚗 Vehicle Validator - Full Stack Application

A comprehensive full-stack application for managing and validating vehicle details with role-based access control. Built with React Native (Mobile), React (Web), Node.js, Express, and MongoDB.

---

## 🌟 Features

- ✅ **Role-Based Access Control** - Superadmin, Admin, and Guard roles
- ✅ **Vehicle Management** - Add, update, delete, and search vehicles
- ✅ **User Management** - Manage admin and guard users
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Multi-Platform** - Web (React) and Mobile (React Native)
- ✅ **RESTful API** - Well-structured backend with Express
- ✅ **MongoDB Database** - Scalable NoSQL database

---

## 📁 Project Structure

```
Vehicle-Validator/
│
├── backend/                      # Node.js + Express REST API
│   ├── .env                      # Environment variables
│   ├── index.js                  # Main server entry point
│   ├── package.json              # Backend dependencies
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin CRUD operations
│   │   ├── authController.js     # Authentication logic
│   │   └── vehicleController.js  # Vehicle CRUD operations
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── roleMiddleware.js     # Role-based access control
│   ├── models/
│   │   ├── user.js               # User schema
│   │   └── vehicle.js            # Vehicle schema
│   ├── routes/
│   │   ├── adminRoutes.js        # Admin endpoints
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── vehicleRoutes.js      # Vehicle endpoints
│   ├── utils/
│   │   ├── generateToken.js      # JWT token generator
│   │   └── initSuperAdmin.js     # Initialize superadmin
│   └── postman.json              # Postman API collection
│
├── frontend/                     # React + Vite Web Application
│   ├── .env                      # Frontend environment variables
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── vercel.json               # Vercel deployment config
│   ├── public/
│   │   ├── _redirects            # Render routing config
│   │   ├── vv.jpg                # Logo/images
│   │   ├── check.png
│   │   └── Wrong.png
│   └── src/
│       ├── App.jsx               # Main React app
│       ├── main.jsx              # React entry point
│       ├── index.css             # Global styles
│       ├── components/
│       │   ├── BASE_URL.jsx      # API base URL
│       │   ├── Footer.jsx        # Footer component
│       │   ├── Header.jsx        # Header component
│       │   ├── Modal.jsx         # Modal component
│       │   ├── PasswordInput.jsx # Password input component
│       │   ├── ProtectedRoute.jsx# Route protection
│       │   └── RoleBasedNav.jsx  # Role-based navigation
│       ├── contexts/
│       │   └── AuthContext.jsx   # Authentication context
│       ├── layouts/
│       │   ├── AppLayout.jsx     # Protected layout
│       │   └── PublicLayout.jsx  # Public layout
│       └── pages/
│           ├── AddAdmins.jsx     # Add admin/guard
│           ├── AddVehicle.jsx    # Add vehicle
│           ├── Display.jsx       # List vehicles
│           ├── Home.jsx          # Search vehicle
│           ├── Login.jsx         # User login
│           ├── NotFound.jsx      # 404 page
│           └── Update.jsx        # Update/delete vehicle
│
├── MobileApp/                    # React Native Mobile Application
│   ├── App.tsx                   # Main mobile app
│   ├── package.json              # Mobile dependencies
│   ├── android/                  # Android configuration
│   ├── ios/                      # iOS configuration
│   └── __tests__/                # Test files
│
├── VERCEL_DEPLOYMENT_GUIDE.md    # Vercel deployment guide
├── RENDER_FRONTEND_DEPLOYMENT_GUIDE.md  # Render deployment guide
└── README.md                     # This file
```

---

## 📝 What Each File/Folder Does

- **backend/index.js**: Main Express server, sets up routes, DB, and middleware.
- **backend/config/db.js**: Connects to MongoDB using Mongoose.
- **backend/controllers/**: Contains logic for each resource (vehicle, user, admin).
- **backend/middlewares/**: Authenticates JWT tokens and checks user roles.
- **backend/models/**: Mongoose schemas for User and Vehicle.
- **backend/routes/**: Defines API endpoints for auth, admin, and vehicle operations.
- **backend/utils/**: Helper functions (JWT, superadmin init).
- **backend/postman.json**: Ready-to-import Postman collection for all API endpoints.
- **frontend/src/App.jsx**: Main React app, sets up routing and layouts.
- **frontend/src/components/**: UI elements (Header, Footer, ProtectedRoute, etc).
- **frontend/src/contexts/AuthContext.jsx**: Handles login/logout, stores user/token.
- **frontend/src/pages/**: Main pages for vehicle CRUD, user management, login, etc.
- **frontend/src/layouts/**: Layout wrappers for public/protected routes.
- **frontend/src/DB/db.json**: (Optional) Local mock DB for testing.

---

## 🔄 Workflow Overview

1. **User Authentication**: Login via `/api/auth/login` (JWT-based). Superadmin can register new admins/guards.
2. **Role-Based Access**: Only authorized roles can access certain endpoints (see below).
3. **Vehicle Management**: Admins can add, update, delete, and search vehicles. Guards can only view/search.
4. **Admin Management**: Superadmin can manage (CRUD) admin/guard users.
5. **Frontend**: React app provides forms and dashboards for all above actions, with protected/private routes.

---

## 🛣️ Backend API Endpoints

### Auth

- `POST /api/auth/login` — Login (all roles)
- `POST /api/auth/register` — Register new user (superadmin only)

### Admins (superadmin only)

- `GET /api/admins` — List all admins
- `GET /api/admins/:id` — Get admin by ID
- `PUT /api/admins/:id` — Update admin
- `DELETE /api/admins/:id` — Delete admin

### Vehicles

- `POST /api/vehicles` — Add vehicle (admin/superadmin)
- `GET /api/vehicles` — List all vehicles (admin/superadmin/guard)
- `GET /api/vehicles/:id` — Get vehicle by ID (admin/superadmin/guard)
- `PUT /api/vehicles/:id` — Update vehicle (admin/superadmin)
- `DELETE /api/vehicles/:id` — Delete vehicle (superadmin only)
- `GET /api/vehicles/search?query=...` — Search vehicle by number/pass (admin/superadmin/guard)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd Vehicle-Validation
```

### 2. Setup the Backend

```bash
cd backend
npm install
# Create a .env file with your MongoDB connection string:
# DBCONN=<your-mongodb-uri>
# PORT=8000 (optional)
npm start
```

The backend server will run on `http://localhost:8000` by default.

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

---

## 🌐 Live Demo

[View deployed app](https://vehicle-validation-hdwus8nxd-rammaheshwari2003s-projects.vercel.app)

---

Feel free to contribute or raise issues!


---

## 📝 What Each Component Does

### Backend
- **index.js**: Main Express server, sets up routes, DB, and middleware
- **config/db.js**: Connects to MongoDB using Mongoose
- **controllers/**: Contains business logic for each resource (vehicle, user, admin)
- **middlewares/**: Authenticates JWT tokens and checks user roles
- **models/**: Mongoose schemas for User and Vehicle
- **routes/**: Defines API endpoints for auth, admin, and vehicle operations
- **utils/**: Helper functions (JWT, superadmin initialization)
- **postman.json**: Ready-to-import Postman collection for all API endpoints

### Frontend
- **App.jsx**: Main React app, sets up routing and layouts
- **components/**: Reusable UI elements (Header, Footer, ProtectedRoute, etc)
- **contexts/AuthContext.jsx**: Handles login/logout, stores user/token
- **pages/**: Main pages for vehicle CRUD, user management, login, etc
- **layouts/**: Layout wrappers for public/protected routes

### Mobile App
- **App.tsx**: Main React Native application
- **android/**: Android-specific configuration and build files
- **ios/**: iOS-specific configuration and build files

---

## 🔄 Application Workflow

1. **User Authentication**: Login via `/api/auth/login` (JWT-based). Superadmin can register new admins/guards
2. **Role-Based Access**: Only authorized roles can access certain endpoints
3. **Vehicle Management**: Admins can add, update, delete, and search vehicles. Guards can only view/search
4. **Admin Management**: Superadmin can manage (CRUD) admin/guard users
5. **Frontend**: React app provides forms and dashboards for all actions with protected routes

---

## 🛣️ Backend API Endpoints

### Auth Routes
- `POST /api/auth/login` — Login (all roles)
- `POST /api/auth/register` — Register new user (superadmin only)

### Admin Routes (superadmin only)
- `GET /api/admins` — List all admins
- `GET /api/admins/:id` — Get admin by ID
- `PUT /api/admins/:id` — Update admin
- `DELETE /api/admins/:id` — Delete admin

### Vehicle Routes
- `POST /api/vehicles` — Add vehicle (admin/superadmin)
- `GET /api/vehicles` — List all vehicles (admin/superadmin/guard)
- `GET /api/vehicles/:id` — Get vehicle by ID (admin/superadmin/guard)
- `PUT /api/vehicles/:id` — Update vehicle (admin/superadmin)
- `DELETE /api/vehicles/:id` — Delete vehicle (superadmin only)
- `GET /api/vehicles/search?query=...` — Search vehicle by number/pass (admin/superadmin/guard)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/prince62058/Assesment_Migration_RctNtv.git
cd Assesment_Migration_RctNtv
```

### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file with:
# MONGO_URI=<your-mongodb-connection-string>
# JWT_SECRET=<your-secret-key>
# PORT=5000

npm start
# or for development:
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Create .env file with:
# VITE_BASE_URL=http://localhost:5000

npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Setup Mobile App (Optional)

```bash
cd ../MobileApp
npm install

# For Android:
npm run android

# For iOS:
npm run ios
```

---

## 🌐 Live Deployment

### Production URLs

| Service | URL | Status |
|---------|-----|--------|
| **Backend API** | [https://vechile-validator-backend-im0r.onrender.com](https://vechile-validator-backend-im0r.onrender.com) | ✅ Live |
| **Frontend Web** | [https://vehicle-validator-frontend-kdrzkogld.vercel.app](https://vehicle-validator-frontend-kdrzkogld.vercel.app) | ✅ Live |
| **Repository** | [https://github.com/prince62058/Assesment_Migration_RctNtv](https://github.com/prince62058/Assesment_Migration_RctNtv) | ✅ Live |

### Deployment Guides

- 📘 **Frontend on Vercel**: See `VERCEL_DEPLOYMENT_GUIDE.md`
- 📗 **Frontend on Render**: See `RENDER_FRONTEND_DEPLOYMENT_GUIDE.md`
- 📙 **Deployment Configuration**: See `DEPLOYMENT_CONFIG.md`
- 📕 **Backend on Render**: Already deployed

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **CORS**: Enabled for cross-origin requests

### Frontend (Web)
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS, Bootstrap
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: React Icons, Lucide React

### Mobile
- **Framework**: React Native
- **Language**: TypeScript
- **Platform**: iOS & Android

---

## 📦 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_BASE_URL=https://vechile-validator-backend-im0r.onrender.com
```

---

## 🧪 Testing

### Using Postman
1. Import `backend/postman.json` into Postman
2. All API endpoints are pre-configured
3. Test authentication, vehicle CRUD, and admin operations

### Manual Testing
1. Start backend and frontend
2. Login with superadmin credentials
3. Test all features through the UI

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Superadmin** | Full access - manage users, vehicles, all CRUD operations |
| **Admin** | Manage vehicles - add, update, view, search |
| **Guard** | View and search vehicles only |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Prince Kumar**
- GitHub: [@prince62058](https://github.com/prince62058)
- Repository: [Assesment_Migration_RctNtv](https://github.com/prince62058/Assesment_Migration_RctNtv)

---

## 🙏 Acknowledgments

- Thanks to all contributors
- Built with modern web technologies
- Deployed on Render

---

**Feel free to ⭐ star this repository if you find it helpful!**

