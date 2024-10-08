import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Input, Button } from 'antd';
import logo from '../assets/nikelogo.png';

const RegisterModal = ({ isOpen, onClose }) => {
    const [reCaptchaToken, setReCaptchaToken] = useState('');
    const [error, setError] = useState('');

    const onFinish = async (values) => {
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

    const onReCaptchaChange = (token:string) => {
        setReCaptchaToken(token);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md w-1/3 flex flex-col">
                <img src={logo} alt="Nike Logo" className='float-left w-11 object-cover mb-5'/>
                <h2 className="text-lg font-bold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                
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

                    <div className='flex flex-col w-full'>
                        <Button type="primary" htmlType="submit" className="bg-blue-500 text-white p-5 rounded-3xl mt-4">
                            Register
                        </Button>
                        <Button onClick={onClose} className="p-5 mt-4 rounded-3xl">
                            Close
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default RegisterModal;
