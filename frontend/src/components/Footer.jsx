import { Building, Building2, Edit, Group, GroupIcon, Home, List, Network, Plus, Shield } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';
import { MdMale } from 'react-icons/md';

const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [unauthorizedOpen, setUnauthorizedOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  const allItems = useMemo(
    () => [
      { name: 'Home', href: '/home', icon: Home, public: true },
      { name: 'Add Company', href: '/addvehicle', icon: Building, roles: ['superadmin'] },
      { name: 'Add Vehicle', href: '/addvehicle', icon: Plus, roles: ['admin', 'superadmin'] },
      { name: 'Display', href: '/display', icon: List, roles: ['admin', 'superadmin'] },
      { name: 'Update', href: '/update', icon: Edit, roles: ['superadmin'] },
      { name: 'Add Admin', href: '/add-admins', icon: Network, roles: ['superadmin'] },
    ],
    []
  );

  const handleClick = (e, item) => {
    e.preventDefault();
    setPendingPath(item.href);

    if (!user) {
      if (item.public) return navigate(item.href);
      setLoginOpen(true);
      return;
    }

    if (item.roles && !item.roles.includes(user.role)) {
      setUnauthorizedOpen(true);
      return;
    }

    navigate(item.href);
  };

  return (
    <footer className="w-full bg-gray-900 text-gray-200 px-2 sm:px-4 py-3 sm:py-4">
      {/* Address Section */}
      {/* <div className="mb-3 sm:mb-4">
        <p className="flex justify-center items-start text-xs sm:text-sm text-center max-w-4xl mx-auto">
          <FaLocationDot className="text-red-400 mt-0.5 mr-1 sm:mr-2 shrink-0 text-sm sm:text-base" />
          <span className="leading-relaxed">
            8948+FP, Abbas Nagar, Gandhi Nagar, Bhopal, Madhya Pradesh 462036
          </span>
        </p>
      </div> */}

      <nav className="overflow-x-auto scrollbar-hide">
        <div className="flex justify-between items-center min-w-max px-1 sm:px-4 space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6">
          {allItems.map(item => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={e => handleClick(e, item)}
                className={`flex flex-col items-center p-1 sm:p-2 transition-colors group min-w-0 flex-shrink-0 ${
                  item.public || !item.roles || (user && item.roles.includes(user.role))
                    ? 'text-gray-200 hover:text-blue-400'
                    : 'text-gray-500 hover:text-gray-400 cursor-not-allowed'
                }`}
              >
                <Icon className="w-4 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 mb-0.5 sm:mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-center whitespace-nowrap">
                  {item.name === 'Add Vehicle' ? (
                    <>
                      <span className="sm:hidden">Add</span>
                      <span className="hidden sm:inline">Add Vehicle</span>
                    </>
                  ) : item.name === 'Add Admin' ? (
                    <>
                      <span className="sm:hidden">Admin</span>
                      <span className="hidden sm:inline">Add Admin</span>
                    </>
                  ) : (
                    item.name
                  )}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Modals for gating */}
      <Modal
        isOpen={loginOpen}
        title="Login Required"
        description="Please login to access this section."
        confirmText="Go to Login"
        onConfirm={() => {
          setLoginOpen(false);
          navigate('/login');
        }}
        cancelText="Cancel"
        onCancel={() => setLoginOpen(false)}
      />
      <Modal
        isOpen={unauthorizedOpen}
        title="Not Authorized"
        description="You are not authorized to access this section."
        confirmText="OK"
        onConfirm={() => setUnauthorizedOpen(false)}
        cancelText="Close"
        onCancel={() => setUnauthorizedOpen(false)}
      />
    </footer>
  );
};

export default Footer;
