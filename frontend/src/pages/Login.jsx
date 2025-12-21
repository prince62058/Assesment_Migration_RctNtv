import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../components/BASE_URL';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        mobile: mobileNumber,
        password: password,
        role: role,
      });

      // Store token and user info using auth context
      login(
        {
          id: response.data._id,
          name: response.data.name,
          role: response.data.role,
        },
        response.data.token
      );

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="  bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl px-8 py-6">
        <div className="text-center mb-">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Login </h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Role
          </label>
          <select
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value=""> Are You ? </option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="guard">Guard</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              value={mobileNumber}
              onChange={e => setMobileNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />

          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
