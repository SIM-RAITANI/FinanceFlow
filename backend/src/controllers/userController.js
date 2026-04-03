import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import { logActivity } from '../utils/logger.js';

export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({ _id: { $ne: req.user.id } });

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});


export const updateUserRole = asyncHandler(async (req, res, next) => {
    const { role } = req.body;

    
    if (!['viewer', 'analyst', 'admin'].includes(role)) {
        return res.status(400).json({ message: "Invalid role provided" });
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await logActivity(
        req, 
        'ROLE_CHANGE', 
        `Changed role to ${role}`, 
        user.email
    );

    res.status(200).json({
        success: true,
        data: user
    });
});

export const toggleUserStatus = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Prevent Admin from deactivating themselves
    if (user._id.toString() === req.user.id) {
        return res.status(400).json({ message: "You cannot deactivate your own admin account" });
    }

    // Flip the status
    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();

    const recordDetails = `${user.status === 'active' ? 'Activated' : 'Deactivated'} user account`;
    await logActivity(
        req, 
        'USER_STATUS_CHANGE', 
        recordDetails, 
        user.email
    );

    res.status(200).json({
        success: true,
        message: `User account is now ${user.status}`,
        data: user
    });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const recordDetails = `Deleted user account`;

    await user.deleteOne();
    await logActivity(
        req, 
        'DELETE_USER', 
        recordDetails, 
        user.email
    );

    res.status(200).json({
        success: true,
        message: "User removed from system"
    });
});