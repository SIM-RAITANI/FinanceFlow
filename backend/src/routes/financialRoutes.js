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

/**
 * @swagger
 * /finance/summary:
 * get:
 * summary: Get personal income/expense summary
 * tags: [Finance]
 * security:
 * - bearerAuth: []
 */
router.get('/summary', getSummary);

/**
 * @swagger
 * /finance:
 * get:
 * summary: Get personal transaction history
 * tags: [Finance]
 * security:
 * - bearerAuth: []
 * post:
 * summary: Create a record (Admin/Analyst Only)
 * tags: [Finance]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/FinancialRecord'
 */
router.get('/', getRecords);


router.post('/', authorize('admin', 'analyst'), recordValidationRules(), validate, createRecord);


router.delete('/:id', authorize('admin'), deleteRecord);

export default router;