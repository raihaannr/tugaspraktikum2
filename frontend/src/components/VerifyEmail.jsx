import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const query = useQuery();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = query.get('token');
                const response = await axios.get(`/verify-email?token=${token}`);
                setMessage(response.data.msg);
            } catch (error) {
                console.error('Error verifying email:', error);
                setMessage('Failed to verify email');
            }
        };

        verifyEmail();
    }, [query]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default VerifyEmail;
