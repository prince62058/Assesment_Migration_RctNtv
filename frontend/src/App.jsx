import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppLayout from './layouts/AppLayout';
import PublicLayout from './layouts/PublicLayout';

import ProtectedRoute from './components/ProtectedRoute';
import AddAdmins from './pages/AddAdmins';
import AddVehicle from './pages/AddVehicle';
import Display from './pages/Display';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Update from './pages/Update';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes (always accessible) */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Private/App routes */}
          <Route element={<AppLayout />}>
            {/* Superadmin only */}
            <Route
              path="update"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <Update />
                </ProtectedRoute>
              }
            />
            {/* Admin + Superadmin */}
            <Route
              path="display"
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <Display />
                </ProtectedRoute>
              }
            />
            <Route
              path="addvehicle"
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <AddVehicle />
                </ProtectedRoute>
              }
            />
            {/* Superadmin only: manage users */}
            <Route
              path="add-admins"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <AddAdmins />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
