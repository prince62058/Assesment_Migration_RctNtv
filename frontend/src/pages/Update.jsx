import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../components/BASE_URL';
import { useAuth } from '../contexts/AuthContext';

const Update = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const api = `${BASE_URL}/api/vehicles`;
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        toast.error('Please login first.');
      }
    }
  };

  useEffect(() => {
    if (!token) return;
    getData();
  }, [token]);

  const deleteData = async id => {
    try {
      const api = `${BASE_URL}/api/vehicles/${id}`;
      const response = await axios.delete(api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Vehicle deleted successfully!');
      getData();
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error('Please login first.');
      } else {
        toast.error('Failed to delete vehicle.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Update Vehicle Records
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 relative"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Record #{index + 1}</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Vehicle Number:</span> {item.vehicleNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Pass Number:</span> {item.passNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">RC/DL Number:</span> {item.dlOrRcNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Owner Name:</span> {item.ownerName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Owner Contact:</span> {item.ownerContact}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span> {item.permanentAddress}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Flat Number:</span> {item.flatNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Flat Owner Name:</span> {item.flatOwnerName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Valid Till:</span>{' '}
                  {new Date(item.validTill).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => deleteData(item._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
              >
                <MdDelete size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Update;
