import express from "express";
import { sendVerificationEmail, verifyEmail } from "../controllers/Email.js";

const router = express.Router();

router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email', verifyEmail);


export default router;
