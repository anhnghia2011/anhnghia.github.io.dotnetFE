import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../assets/nikelogo.png';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
    const [reCaptchaToken, setReCaptchaToken] = useState('');
    const [error, setError] = useState('');
    const onFinish = async (values: { firstName: string; lastName: string; email: string; phoneNumber: string; password: string }) => {
        const { firstName, lastName, email, phoneNumber, password } = values;
        
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

    const onReCaptchaChange = (token: string | null) => {
        setReCaptchaToken(token || '');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
            <img src={logo} alt="Nike Logo" className="w-12 h-auto object-cover mb-4 mx-auto" />
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
    
            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                    <Input />
                </Form.Item>
    
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                    <Input />
                </Form.Item>
    
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                >
                    <Input />
                </Form.Item>
    
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                    <Input />
                </Form.Item>
    
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password />
                </Form.Item>
    
                <ReCAPTCHA
                    sitekey="6Leo6VkqAAAAAGnZKkjTKpSp6cBWfxsSlSzPhtWQ"
                    onChange={onReCaptchaChange}
                    className="flex justify-center mb-4"
                />
    
                <div className="flex flex-col w-full">
                    <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 rounded-3xl mt-4">
                        Register
                    </Button>
                    <Button onClick={onClose} className="py-2 mt-4 rounded-3xl">
                        Close
                    </Button>
                </div>
            </Form>
        </div>
    </div>
    
    );
};

export default RegisterModal;
