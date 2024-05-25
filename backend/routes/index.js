import express from "express";
import { Register } from "../controllers/Users.js";
import { sendVerificationEmail, verifyEmail } from "../controllers/Email.js";

const router = express.Router();

router.post('/users', Register);
router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email', verifyEmail);


export default router;