import FinancialRecord from '../models/FinancialRecord.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';

export const getAdminStats = asyncHandler(async (req, res, next) => {
    
    const overallSummary = await FinancialRecord.aggregate([
        {
            $group: {
                _id: null,
                totalIncome: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } },
                totalExpense: { $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } },
                count: { $sum: 1 }
            }
        }
    ]);

   
    const categoryStats = await FinancialRecord.aggregate([
        { $match: { type: 'expense' } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $sort: { total: -1 } }
    ]);

    
    const userSpendStats = await FinancialRecord.aggregate([
        { $match: { type: 'expense' } },
        {
            $group: {
                _id: "$user",
                totalSpent: { $sum: "$amount" }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        { $unwind: "$userDetails" },
        {
            $project: {
                username: "$userDetails.username",
                totalSpent: 1
            }
        },
        { $sort: { totalSpent: -1 } }
    ]);

    res.status(200).json({
        success: true,
        summary: overallSummary[0] || { totalIncome: 0, totalExpense: 0, count: 0 },
        categoryStats,
        userSpendStats
    });
});

export const getAllTransactions = asyncHandler(async (req, res, next) => {
    const transactions = await FinancialRecord.find()
        .populate('user', 'username email role')
        .sort({ date: -1 });

    res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
    });
});

export const getActivityLogs = asyncHandler(async (req, res, next) => {
    const logs = await Activity.find()
        .populate('user', 'username email')
        .sort({ createdAt: -1 })
        .limit(100); 

    res.status(200).json({ success: true, data: logs });
});