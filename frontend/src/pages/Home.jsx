import axios from 'axios';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../components/BASE_URL';
import Modal from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0); // 0, 200, or 404
  const [show, setShow] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      setLoginPrompt(true);
      return;
    }

    const token = localStorage.getItem('token');
    const normalizedSearch = search.toUpperCase().replace(/[\s-]/g, '');

    try {
      const api = `${BASE_URL}/api/vehicles/search?query=${normalizedSearch}`;
      const response = await axios.get(api, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });

      setData(response.data || null);
      setStatus(200);
    } catch (error) {
      console.error('Search error:', error);
      setData(null);
      setStatus(404);
    }
  };

  return (
    <div className=" bg-gray-50 flex flex-col items-center justify-center p-4 max-w-sm sm:max-w-md mx-auto mt-6 sm:mt-8 px-3 sm:px-4">
      {/* Logo */}
      <div className="w-full flex justify-center mb-4 sm:mb-6">
        <img
          src={'/vv.jpg'}
          alt="Vehicle Validation"
          className="w-50 h-auto  sm:w-60 md:w-64 lg:w-70 max-w-full"
        />
      </div>

      {/* Search Section */}
      <form onSubmit={handleSubmit} className="flex gap-1 sm:gap-2 mb-4 ">
        <input
          type="text"
          placeholder={'Enter Vehicle Number'}
          value={search}
          onChange={e => {
            const value = e.target.value;
            setSearch(value);
            if (status !== 0 || data || show) {
              setStatus(0);
              setData(null);
              if (show) setShow(false);
            }
          }}
          className={`flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
        />
        <button
          type="submit"
          disabled={!search.trim()}
          className={`px-3 sm:px-4 rounded-r-lg flex items-center justify-center transition ${
            !search.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </form>

      {/* Dynamic Result Box */}
      {(status === 200 || status === 404) && (
        <div className="w-full max-w-[70%] mx-auto">
          <div
            onClick={() => {
              if (status === 200) setShow(true);
            }}
            className={`flex flex-col justify-center items-center gap-2 xs:gap-3 p-2 xs:p-3 sm:p-4 mb-3 rounded-lg shadow border transition-all duration-200 ${
              status === 200
                ? ' hover:bg-green-300 border-green-300 cursor-pointer'
                : ' border-red-300 cursor-default'
            }`}
          >
            <img
              src={status === 200 ? '/check.png' : '/Wrong.png'}
              alt={status === 200 ? 'Valid' : 'Invalid'}
              className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 object-contain"
            />
            <h6
              className={`font-bold text-2xl xs:text-sm sm:text-base ${
                status === 200 ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {status === 200 ? 'Valid' : 'Vehicle Not Found'}
            </h6>
            {status === 200 && (
              <p className="font-semibold text-xs xs:text-sm sm:text-base text-green-800">
                Details Found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Modal */}

      {show && data && data['vehicleNumber'] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg w-full max-w-[80%] xs:max-w-sm sm:max-w-md max-h-[70vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b p-2 xs:p-3 sm:p-4 flex items-center justify-center">
              <span className="text-lg xs:text-xl font-bold">{data && data['vehicleNumber']}</span>
              <button
                onClick={() => setShow(false)}
                className="absolute top-2 right-2 xs:top-3 xs:right-3 text-gray-500 hover:text-gray-700"
              >
                <MdCancel className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="p-2 xs:p-3 sm:p-4 space-y-2 xs:space-y-3">
              <div className="flex items-center justify-center space-x-8 xs:space-x-12 sm:space-x-16">
                <span className=" xs:text-sm text-gray-600">Owner Name</span>
                <span className="xs:text-sm sm:text-base">{data && data['ownerName']}</span>
              </div>

              <div className="flex items-center justify-center space-x-8 xs:space-x-12 sm:space-x-16">
                <span className="  xs:text-sm text-gray-600">Owner Contact</span>
                <span className=" xs:text-sm sm:text-base">{data && data['ownerContact']}</span>
              </div>

              <div className="flex items-center justify-center space-x-8 xs:space-x-12 sm:space-x-16">
                <span className="  xs:text-sm text-gray-600">Alternate Contact</span>
                <span className=" xs:text-sm sm:text-base">{data && data['alternateContact']}</span>
              </div>

              <div className="flex items-center justify-center space-x-8 xs:space-x-12 sm:space-x-16">
                <span className="  xs:text-sm text-gray-600">Flat Owner</span>
                <span className=" xs:text-sm sm:text-base">{data && data['flatOwnerName']}</span>
              </div>

              {data && data['flatOwnerContact'] && (
                <div className="flex items-center justify-center space-x-8 xs:space-x-12 sm:space-x-16">
                  <span className="  xs:text-sm text-gray-600">Flat Owner Contact</span>
                  <span className=" xs:text-sm sm:text-base">
                    {data && data['flatOwnerContact']}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-center space-x-8 xs:space-x-12 sm:space-x-16">
                <span className="  xs:text-sm text-gray-600">Valid Till</span>
                <span className=" xs:text-sm sm:text-base">
                  {data && data['validTill']
                    ? new Date(data['validTill']).toLocaleDateString()
                    : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth/Authorization Modals */}
      <Modal
        isOpen={loginPrompt}
        title="Login Required"
        description="Please login to search."
        confirmText="Go to Login"
        onConfirm={() => {
          setLoginPrompt(false);
          navigate('/login');
        }}
        cancelText="Cancel"
        onCancel={() => setLoginPrompt(false)}
      />
    </div>
  );
};

export default Home;
