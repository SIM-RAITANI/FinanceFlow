import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import asyncHandler from "../utils/asyncHandler.js";


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};


export const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        username,
        email,
        password
    });

    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status
        }
    });
});


export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    
   
    if (user.status !== 'active') {
        return res.status(403).json({ 
            message: "User account is inactive. Please contact support." 
        });
    }

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status
        }
    });
});


export const logoutUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, message: "Logged out successfully" });
});