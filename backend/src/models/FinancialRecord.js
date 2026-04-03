import mongoose from 'mongoose';

const financialRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, "Please provide an amount"],
        min: [0, "Amount must be a positive number"]
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, "Please provide a type"]
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true,
        maxlength: [200, "Description cannot exceed 200 characters"]
    }

}, {
    timestamps: true,
    toJSON : {virtuals:true},
    toObject : {virtuals:true}
});

financialRecordSchema.index({ user: 1, date: -1 });
financialRecordSchema.index({type:1});
const FinancialRecord = mongoose.model('FinancialRecord', financialRecordSchema);

export default FinancialRecord;
