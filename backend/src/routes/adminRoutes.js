import express from 'express';
import { getAdminStats,getAllTransactions , getActivityLogs } from '../controllers/adminController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/stats', protect, authorize('admin', 'analyst'), getAdminStats);
router.get('/transactions', protect, authorize('admin', 'analyst'), getAllTransactions);
router.get('/logs', protect, authorize('admin'), getActivityLogs);

export default router;