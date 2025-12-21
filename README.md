# Vehicle Validation

Vehicle Validation is a full-stack web application for managing and validating vehicle details, user roles, and admin operations for a residential society. It features a secure backend (Node.js, Express, MongoDB) and a modern React frontend.

---

## 📁 Full Project Structure & File/Folder Explanations

```
Vehicle-Validation/
│
├── backend/                  # Node.js + Express REST API
│   ├── .env                  # Environment variables (DB, secrets)
│   ├── index.js              # Main server entry point
│   ├── package.json          # Backend dependencies
│   ├── config/
│   │   └── db.js             # MongoDB connection logic
│   ├── controllers/          # Route handler logic
│   │   ├── adminController.js    # Admin CRUD logic
│   │   ├── authController.js     # Auth/register/login logic
│   │   └── vehicleController.js  # Vehicle CRUD/search logic
│   ├── middlewares/          # Express middlewares
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── roleMiddleware.js     # Role-based access control
│   ├── models/               # Mongoose schemas
│   │   ├── user.js               # User/admin/guard schema
│   │   └── vehicle.js            # Vehicle schema
│   ├── routes/               # API route definitions
│   │   ├── adminRoutes.js        # /api/admins endpoints
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   └── vehicleRoutes.js      # /api/vehicles endpoints
│   ├── utils/                # Utility functions
│   │   ├── generateToken.js      # JWT token generator
│   │   └── initSuperAdmin.js     # Ensures superadmin exists
│   └── postman.json          # Postman collection for API testing
│
├── frontend/                 # React + Vite frontend
│   ├── .env                  # Frontend environment variables
│   ├── index.html            # HTML entry point
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite config
│   ├── public/
│   │   └── vv.png            # Logo/image
│   └── src/
│       ├── App.jsx           # Main React app/router
│       ├── main.jsx          # React entry point
│       ├── index.css         # Tailwind/global styles
│       ├── components/       # Reusable UI components
│       │   ├── BASE_URL.jsx      # API base URL
│       │   ├── Footer.jsx        # Footer UI
│       │   ├── Header.jsx        # Header UI
│       │   ├── ProtectedRoute.jsx# Route guard
│       │   └── RoleBasedNav.jsx  # Role-based navigation
│       ├── contexts/
│       │   └── AuthContext.jsx   # Auth state/context
│       ├── layouts/          # Layout wrappers
│       │   ├── AppLayout.jsx     # Protected layout
│       │   └── PublicLayout.jsx  # Public layout
│       └── pages/            # Main app pages
│           ├── AddAdmins.jsx     # Add admin/guard user
│           ├── AddVehicle.jsx    # Add vehicle form
│           ├── Display.jsx       # List all vehicles
│           ├── Home.jsx          # Search vehicle
│           ├── Login.jsx         # User login
│           ├── NotFound.jsx      # 404 page
│           └── Update.jsx        # Update/delete vehicle
│
└── README.md
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

## 🛣️ Main Features

- Add, display, update, and validate vehicle details
- RESTful API with MongoDB database
- Modern React UI with routing

## 📂 Key Files & Folders

- `backend/index.js` - Express server entry point
- `backend/controllers/` - Business logic for vehicle operations
- `backend/models/` - Mongoose schemas/models
- `backend/routes/` - API endpoints
- `frontend/src/pages/` - Main React pages (Home, AddVehicle, Display, Update)
- `frontend/src/components/` - Reusable UI components

## 🌐 Live Demo

[View deployed app](https://vehicle-validation-hdwus8nxd-rammaheshwari2003s-projects.vercel.app)

---

Feel free to contribute or raise issues!
