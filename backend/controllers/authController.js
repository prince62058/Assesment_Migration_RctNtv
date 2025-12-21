const User = require('../models/user');
const generateToken = require('../utils/generateToken');
exports.registerUser = async (req, res) => {
    const { name, mobile, password, role, address, designation, email } = req.body;
    try {
        const user = await User.create({
            name,
            mobile,
            password,
            role,
            address,
            designation,
            email: email || null
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            email: user.email,
            role: user.role,
            designation: user.designation,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        res.status(400).json({ message: "User registration failed", error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { mobile, password, role } = req.body;

    try {
        const user = await User.findOne({ mobile });

        if (user && (await user.matchPassword(password)) && user.role === role) {
            res.json({
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                role: user.role,
                designation: user.designation,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials or role mismatch" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};