const Vehicle = require('../models/vehicle');
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create vehicle', error: error.message });
  }
};
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve vehicles', error: error.message });
  }
};
exports.getVehicleById = async (req, res) => {
  console.log('getVehicleById called with ID:', req.params.id);
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve vehicle', error: error.message });
  }
};
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update vehicle', error: error.message });
  }
};
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(204).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete vehicle', error: error.message });
  }
};

exports.searchVehicle = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Normalize: remove spaces/dashes, uppercase
    const normalized = query.replace(/[\s-]/g, '').toUpperCase();
    // Regex that ignores spaces/dashes in stored values too
    const pattern = normalized.split('').join('[\\s-]*');
    const regex = new RegExp(pattern, 'i');

    // Allow all authenticated roles to search across all vehicles
    const vehicle = await Vehicle.findOne({
      $or: [{ vehicleNumber: regex }, { passNumber: regex }],
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'No vehicle found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search vehicle', error: error.message });
  }
};
