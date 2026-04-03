import { getCategoryStats, getDashboardSummary } from '../services/financialService.js';
import FinancialRecord from '../models/FinancialRecord.js';
import User from '../models/User.js';
import asyncHandler from "../utils/asyncHandler.js";
import { logActivity } from '../utils/logger.js';


export const createRecord = asyncHandler(async (req, res, next) => {
    const { amount, type, category, description, date, targetUserEmail } = req.body;

    let targetUserId = req.user.id;

    // If email provided, find that user
    if (targetUserEmail && (req.user.role === 'admin' || req.user.role === 'analyst')) {
        const targetUser = await User.findOne({ email: targetUserEmail.toLowerCase() });
        if (!targetUser) {
            return res.status(404).json({ message: "User with this email not found" });
        }
        targetUserId = targetUser._id;
    }

    const record = await FinancialRecord.create({
        user: targetUserId,
        amount,
        type,
        category,
        description,
        date: date || Date.now()
    });

    
    const populatedRecord = await FinancialRecord.findById(record._id).populate('user', 'username email');

    res.status(201).json({
        success: true,
        data: populatedRecord
    });
});


export const getRecords = asyncHandler(async (req, res, next) => {
    console.log("Insied get record page")
    const filter = { user: req.user.id };
    console.log("User id : " , req.user.id )
   
    if (req.query.type) {
        filter.type = req.query.type;
    }

    const records = await FinancialRecord.find(filter).sort({ date: -1 });
    console.log("Transaction History...",records);
    res.status(200).json({
        success: true,
        count: records.length,
        data: records
    });
});


export const getSummary = asyncHandler(async (req, res, next) => {
    const summary = await getDashboardSummary(req.user.id);
    const categoryStats = await getCategoryStats(req.user.id);

    res.status(200).json({
        success: true,
        summary,
        categoryStats
    });
});

export const deleteRecord = asyncHandler(async (req, res, next) => {
    const recordId = req.params.id;

    const record = await FinancialRecord.findById(recordId);

    if (!record) {
        return res.status(404).json({
            success: false,
            message: "Record not found"
        });
    }

   
    const isOwner = record.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
        return res.status(403).json({
            success: false,
            message: "Not authorized to delete this record"
        });
    }
    const recordDetails = `Deleted ${record.type} of $${record.amount} in category ${record.category}`;
    await record.deleteOne();
    await logActivity(
        req, 
        'DELETE_RECORD', 
        recordDetails
    );

    res.status(200).json({
        success: true,
        message: "Record deleted successfully"
    });
});