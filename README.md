# 🚗 Vehicle Validator Application

A full-stack vehicle validation system with role-based access control for Super Admin, Admin, and Guard users.

## 📋 Project Overview

This application provides a comprehensive vehicle validation system with three main components:
- **Frontend**: React.js web application (Deployed on Vercel)
- **Backend**: Node.js/Express API (Deployed on Render)
- **Mobile App**: React Native mobile application

## 🌐 Live Deployment

- **Frontend URL**: `https://vehicle-validator-frontend-2c14855pe.vercel.app`
- **Backend URL**: `https://vechile-validator-backend-im0r.onrender.com`

## 🔐 Super Admin Credentials

**IMPORTANT**: Use these credentials to login as Super Admin:

```
Mobile Number: 1234567890
Password: admin123
Role: Super Admin
```

## 🏗️ Project Structure

```
Vehicle-Validator/
├── backend/          # Node.js/Express backend
├── frontend/         # React.js frontend
└── MobileApp/        # React Native mobile app
```

## 🚀 Features

### Super Admin
- Create and manage Admin accounts
- View all vehicles
- Full system access

### Admin
- Create and manage Guard accounts
- View vehicles assigned to their guards
- Manage vehicle validations

### Guard
- Validate vehicles
- View assigned vehicles
- Update vehicle status

## 💻 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt

### Mobile App
- React Native
- React Navigation

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# The BASE_URL is already configured in src/components/BASE_URL.jsx

npm run dev
```

### Mobile App Setup

```bash
cd MobileApp
npm install

# For Android
npm run android

# For iOS
npm run ios
```

## 🌍 Deployment

### Backend (Render)
1. Push code to GitHub
2. Connect Render to your repository
3. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy (no environment variables needed - BASE_URL is hardcoded)

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
PORT=5000
```

### Frontend
No environment variables needed. Backend URL is configured in `src/components/BASE_URL.jsx`

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Admin Management
- `GET /api/admins` - Get all admins (Super Admin only)
- `POST /api/admins` - Create admin (Super Admin only)

### Vehicle Management
- `GET /api/vehicles` - Get vehicles
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration for production
- Protected API routes

## 🐛 Troubleshooting

### Login Issues
1. Ensure you're using the correct credentials:
   - Mobile: `1234567890`
   - Password: `admin123`
   - Role: `superadmin`

2. Check browser console for errors
3. Verify backend is running on Render
4. Check CORS settings in backend

### CORS Errors
- Backend is configured to allow all `.vercel.app` domains
- If you face issues, check the origin in browser console

### Database Connection
- Ensure MongoDB URI is correct in Render environment variables
- Check if IP whitelist is set to allow all IPs (0.0.0.0/0) in MongoDB Atlas

## 📝 Notes

- Super Admin is automatically created when backend starts
- First deployment might take 2-3 minutes on Render (cold start)
- Mobile app needs to be configured with the backend URL

## 👨‍💻 Development

```bash
# Run backend in development mode
cd backend
npm run dev

# Run frontend in development mode
cd frontend
npm run dev

# Build frontend for production
cd frontend
npm run build
```

## 📄 License

This project is private and confidential.

## 🤝 Support

For any issues or questions, please contact the development team.

---

**Last Updated**: December 2025
