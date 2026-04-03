import express from "express";
import {registerUser,loginUser,logoutUser} from "../controllers/authController.js";
import { validate,registerValidationRules } from "../middlewares/validation.js";

const router=express.Router();

router.post('/register',registerValidationRules(),validate,registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);

export default router;
