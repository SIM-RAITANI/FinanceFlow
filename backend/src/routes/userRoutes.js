import express from 'express';
import { getAllUsers, updateUserRole, deleteUser ,toggleUserStatus} from '../controllers/userController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllUsers);
router.patch('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);
router.patch('/:id/status', toggleUserStatus);

export default router;