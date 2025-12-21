import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../components/BASE_URL';
import { useAuth } from '../contexts/AuthContext';

const AddVehicle = () => {
  const [errors, setErrors] = useState({});
  const { token } = useAuth();
  const [input, setInput] = useState({
    vehiclenumber: '',
    passnumber: '',
    vehicletype: '',
    vehicleownername: '',
    flatno: '',
    rcnumber: '',
    vehicleownercontact: '',
    alternatecontact: '',
    email: '',
    address: '',
    flatownername: '',
    flatownercontact: '',
    validdate: '',
  });

  const handleInput = e => {
    const { name, value } = e.target;

    if (name === 'vehiclenumber') {
      // let user type freely (spaces/lowercase allowed)
      setInput(prev => ({ ...prev, [name]: value }));
      // clear validation while typing
      setErrors(prev => ({ ...prev, vehiclenumber: '' }));
    } else {
      setInput(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // format vehicle number before sending
    const formattedVehicleNumber = input.vehiclenumber.toUpperCase().replace(/\s+/g, '');

    const regex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
    if (!regex.test(formattedVehicleNumber)) {
      setErrors(prev => ({
        ...prev,
        vehiclenumber: 'Invalid vehicle number format (e.g. MH12AB1234)',
      }));
      return;
    }

    try {
      const vehicleData = {
        vehicleNumber: formattedVehicleNumber,
        passNumber: input.passnumber,
        flatNumber: input.flatno,
        ownerName: input.vehicleownername,
        dlOrRcNumber: input.rcnumber,
        ownerContact: input.vehicleownercontact,
        alternateContact: input.alternatecontact,
        email: input.email,
        permanentAddress: input.address,
        flatOwnerName: input.flatownername,
        flatOwnerContact: input.flatownercontact,
        validTill: input.validdate,
      };

      const api = `${BASE_URL}/api/vehicles`;
      await axios.post(api, vehicleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Vehicle added successfully!');

      setInput({
        vehiclenumber: '',
        passnumber: '',
        vehicletype: '',
        vehicleownername: '',
        flatno: '',
        rcnumber: '',
        vehicleownercontact: '',
        alternatecontact: '',
        email: '',
        address: '',
        flatownername: '',
        flatownercontact: '',
        validdate: '',
      });
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error('Please login first.');
      } else if (
        error.response?.status === 400 &&
        error.response.data.error.includes('passNumber')
      ) {
        toast.error('Pass number already exists. Please use a unique pass number.');
      } else {
        toast.error('Failed to add vehicle. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-2 xs:p-3 sm:p-4">
      <h1 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2 xs:mb-6">Add Vehicle</h1>

      <form
        id="addvehicle"
        onSubmit={handleSubmit}
        className="w-full max-w-md  bg-gradient-to-b from-white to-gray-50 p-4 xs:p-6 sm:p-7 rounded-xl shadow-lg space-y-4 xs:space-y-5 relative"
      >
        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="text"
            placeholder="Vehicle Number (e.g. MH12AB1234)"
            name="vehiclenumber"
            value={input.vehiclenumber}
            onChange={handleInput}
            required
            className={`w-full p-2 xs:p-3 text-xs xs:text-sm border rounded focus:outline-none focus:ring-2 ${
              errors.vehiclenumber
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.vehiclenumber && (
            <p className="text-red-500 text-xs mt-1">{errors.vehiclenumber}</p>
          )}
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="text"
            placeholder="Pass Number"
            name="passnumber"
            value={input.passnumber}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <select
            name="vehicletype"
            value={input.vehicletype}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
            <option value="Auto Rickshaw">Auto Rickshaw</option>
          </select>
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="text"
            placeholder="Vehicle Owner Name"
            name="vehicleownername"
            value={input.vehicleownername}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="text"
            placeholder="Flat No."
            name="flatno"
            value={input.flatno}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="text"
            placeholder="DL / RC Number"
            name="rcnumber"
            value={input.rcnumber}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="tel"
            placeholder="Vehicle Owner Contact"
            name="vehicleownercontact"
            value={input.vehicleownercontact}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="tel"
            placeholder="Alternate Contact"
            name="alternatecontact"
            value={input.alternatecontact}
            onChange={handleInput}
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleInput}
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="text"
            placeholder="Permanent Address"
            name="address"
            value={input.address}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="text"
            placeholder="Flat Owner Name"
            name="flatownername"
            value={input.flatownername}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="tel"
            placeholder="Flat Owner Contact"
            name="flatownercontact"
            value={input.flatownercontact}
            onChange={handleInput}
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <span className="text-red-500 z-1 absolute text-xs">*</span>
          <input
            type="date"
            name="validdate"
            value={input.validdate}
            onChange={handleInput}
            required
            className="w-full p-2 xs:p-3 text-xs xs:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 xs:py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-xs xs:text-sm"
        >
          Add Vehicle
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddVehicle;
