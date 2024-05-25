import nodemailer from 'nodemailer';
import crypto from 'crypto';
import Users from '../models/UserModel.js';

export const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validasi email
        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ msg: 'Email not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        await Users.update({ verification_token: token }, { where: { email } });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${process.env.CLIENT_URL}/verify-email?token=${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error);
                return res.status(500).json({ msg: 'Error sending email' });
            }
            res.json({ msg: 'Verification email sent' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ msg: 'Token is required' });
        }

        const user = await Users.findOne({ where: { verification_token: token } });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        await Users.update({ is_verified: true, verification_token: null }, { where: { id: user.id } });

        res.json({ msg: 'Email verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
