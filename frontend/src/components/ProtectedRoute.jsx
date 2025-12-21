import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [unauthorizedOpen, setUnauthorizedOpen] = useState(false);
  const [goHome, setGoHome] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <>
        <Modal
          isOpen={!loginOpen || true}
          title="Login Required"
          description="Please login to access this page."
          confirmText="Go to Login"
          onConfirm={() => setLoginOpen(true)}
          cancelText="Cancel"
          onCancel={() => setGoHome(true)}
        />
        {loginOpen && <Navigate to="/login" replace />}
        {goHome && <Navigate to="/home" replace />}
      </>
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <>
        <Modal
          isOpen={!unauthorizedOpen || true}
          title="Not Authorized"
          description="You are not authorized to access this page."
          confirmText="OK"
          onConfirm={() => setUnauthorizedOpen(true)}
          cancelText="Cancel"
          onCancel={() => setGoHome(true)}
        />
        {unauthorizedOpen && <Navigate to="/home" replace />}
        {goHome && <Navigate to="/home" replace />}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
