const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  'http://localhost:5173', // local dev
  process.env.FRONTEND_URL, // vercel deployed URL
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

const db = require('./config/db');
const initSuperAdmin = require('./utils/initSuperAdmin');

db().then(() => {
  initSuperAdmin();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log('Server is running on port :', PORT);
});
