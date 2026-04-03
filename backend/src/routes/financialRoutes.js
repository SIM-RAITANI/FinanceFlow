import express from 'express';
import { 
  createRecord, 
  getRecords, 
  getSummary, 
  deleteRecord 
} from '../controllers/financialController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import { recordValidationRules, validate } from '../middlewares/validation.js';

const router = express.Router();


router.use(protect);


router.get('/summary', getSummary);


router.get('/', getRecords);


router.post('/', authorize('admin', 'analyst'), recordValidationRules(), validate, createRecord);


router.delete('/:id', authorize('admin'), deleteRecord);

export default router;