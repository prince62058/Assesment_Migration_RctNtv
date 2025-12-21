import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleBasedNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = path => location.pathname === path;

  const getNavItems = () => {
    switch (user.role) {
      case 'superadmin':
        return [
          { path: '/display', label: 'View Vehicles' },
          { path: '/addvehicle', label: 'Add Vehicle' },
          { path: '/update', label: 'Manage Vehicles' },
          { path: '/add-admins', label: 'Manage Users' },
        ];
      case 'admin':
        return [
          { path: '/display', label: 'View Vehicles' },
          { path: '/addvehicle', label: 'Add Vehicle' },
          { path: '/update', label: 'Manage Vehicles' },
        ];
      case 'guard':
        return [{ path: '/display', label: 'View Vehicles' }];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return <nav></nav>;
};

export default RoleBasedNav;
