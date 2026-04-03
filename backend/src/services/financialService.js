import mongoose from "mongoose";
import FinancialRecord from "../models/FinancialRecord.js";

export const getDashboardSummary = async(userId) => {
    const stats=await FinancialRecord.aggregate([
        {$match : {user :new mongoose.Types.ObjectId(userId)}},

        {
            $group:{
                _id:'$type',
                totalAmount : {$sum:'$amount'},
                count:{$sum:1}
            }
        }
    ]);
    console.log("Raw stats from DB:", stats);
    const summary={
        income:0,
        expenses:0,
        balance:0,
        transactionCount:0
    };

    stats.forEach(item => {
        if (item._id === 'income') summary.income=item.totalAmount;
        if (item._id === 'expense') summary.expenses=item.totalAmount;
        summary.transactionCount += item.count;
    });

    summary.balance=summary.income-summary.expenses;
    console.log("Summary calculated:", summary);
    return summary;
}

export const getCategoryStats = async (userId) => {
  return await FinancialRecord.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' }
      }
    },
    { $sort: { total: -1 } }
  ]);
};