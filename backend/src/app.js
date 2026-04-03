import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import financialRoutes from './routes/financialRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/finance',financialRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/admin',adminRoutes);

// app.use('(.*)',(req,res)=>{
//     res.status(404).json({
//         status:'fail',
//         message:'Route not found'
//     });
// })

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({
        status : 'error',
        message:err.message || 'Internal Server Error',
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`[Server] Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


export default app;
