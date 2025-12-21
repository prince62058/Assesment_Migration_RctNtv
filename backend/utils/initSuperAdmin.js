const User = require('../models/user');

const initSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await User.findOne({ role: 'superadmin' });

    if (existingSuperAdmin) {
      console.log('Super Admin already exists');
      return;
    }

    const superAdmin = await User.create({
      name: 'Super Admin',
      mobile: '1234567890',
      password: 'admin123',
      role: 'superadmin',
      address: 'System Address',
      designation: 'System Administrator',
      email: 'superadmin@system.com',
    });

    console.log(' Static Super Admin created successfully!');
    console.log(' Mobile: 1234567890');
    console.log(' Password: admin123');
    console.log(' Role: superadmin');
  } catch (error) {
    console.error(' Error creating Super Admin:', error.message);
  }
};

module.exports = initSuperAdmin;
