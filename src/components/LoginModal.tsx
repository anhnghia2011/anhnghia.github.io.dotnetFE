// LoginModal.jsx
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import RegisterModal from '../components/RegisterModal'; // Import RegisterModal

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reCaptchaToken, setReCaptchaToken] = useState('');
    const [error, setError] = useState('');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for registration modal

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reCaptchaToken) {
            setError('Please complete the reCAPTCHA.');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5099/api/Customers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    reCaptchaToken,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                onClose();
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    const onReCaptchaChange = (token: string) => {
        setReCaptchaToken(token);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md w-1/3">
                <h2 className="text-lg font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">Email:</label>
                        <input 
                            className="border border-gray-300 p-2 w-full" 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="password">Password:</label>
                        <input 
                            className="border border-gray-300 p-2 w-full" 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <ReCAPTCHA
                        sitekey="6Leo6VkqAAAAAGnZKkjTKpSp6cBWfxsSlSzPhtWQ" 
                        onChange={onReCaptchaChange}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Login</button>
                    <button type="button" onClick={onClose} className="ml-2 p-2 rounded">Close</button>
                </form>
                <button 
                    onClick={() => setIsRegisterOpen(true)} 
                    className="mt-4 text-blue-500 underline">
                    Don't have an account? Sign Up
                </button>
                {/* Register Modal */}
                <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
            </div>
        </div>
    );
};

export default LoginModal;
