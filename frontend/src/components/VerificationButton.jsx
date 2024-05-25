import React, { useState } from 'react';
import axios from 'axios';

const VerificationButton = () => {
    const [email, setEmail] = useState('');

    const sendVerificationEmail = async () => {
        try {
            // Validasi email
            if (!email) {
                alert('Email is required');
                return;
            }

            const response = await axios.post('/send-verification-email', { email });
            alert(response.data.msg);
        } catch (error) {
            console.error('Error sending verification email:', error);
            alert('Failed to send verification email');
        }
    };

    return (
        <div className="flex flex-col items-center pt-16">
            <input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none"
            />
            <button
                onClick={sendVerificationEmail}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Verifikasi Email
            </button>
        </div>
    );
};

export default VerificationButton;
