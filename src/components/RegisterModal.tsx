// RegisterModal.jsx
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RegisterModal = ({ isOpen, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [reCaptchaToken, setReCaptchaToken] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!reCaptchaToken) {
            setError('Please complete the reCAPTCHA.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5099/api/Customers/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    password,
                    reCaptchaToken,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                onClose();
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred during registration. Please try again.');
        }
    };

    const onReCaptchaChange = (token: string) => {
        setReCaptchaToken(token);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md w-1/3">
                <h2 className="text-lg font-bold mb-4">Register</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="firstName">First Name:</label>
                        <input 
                            className="border border-gray-300 p-2 w-full" 
                            type="text" 
                            id="firstName" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="lastName">Last Name:</label>
                        <input 
                            className="border border-gray-300 p-2 w-full" 
                            type="text" 
                            id="lastName" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required 
                        />
                    </div>
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
                        <label className="block mb-1" htmlFor="phoneNumber">Phone Number:</label>
                        <input 
                            className="border border-gray-300 p-2 w-full" 
                            type="text" 
                            id="phoneNumber" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Register</button>
                    <button type="button" onClick={onClose} className="ml-2 p-2 rounded">Close</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
