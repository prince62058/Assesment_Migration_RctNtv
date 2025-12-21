const User = require("../models/user");

exports.getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve admins", error: error.message });
    }
}

exports.getAdminById = async (req, res) => {
    try {
        const admin = await User.findOne({ _id: req.params.id, role: "admin" }).select("-password");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve admin", error: error.message });
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await User.findOneAndUpdate(
            { _id: req.params.id, role: "admin" },
            { $set: req.body },
            { new: true }
        ).select("-password");
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: "Failed to update admin", error: error.message });
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await User.findOneAndDelete({ _id: req.params.id, role: "admin" }).select("-password");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete admin", error: error.message });
    }
}
