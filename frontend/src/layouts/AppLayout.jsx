import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';

const AppLayout = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AppLayout;
