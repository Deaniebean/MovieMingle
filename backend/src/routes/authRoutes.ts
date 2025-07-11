import express from 'express';
import {register, login, resetPassword} from '../controllers/authController';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/reset-password", resetPassword);

export default router;