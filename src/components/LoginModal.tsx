// LoginModal.tsx
import { Button, Input } from "antd";
import axios from 'axios';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/nikelogo.png';
import RegisterModal from '../components/RegisterModal';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>(''); 
    const [reCaptchaToken, setReCaptchaToken] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reCaptchaToken) {
            setError('Please complete the reCAPTCHA.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5099/api/Customers/login', {
                email,
                password,
                reCaptchaToken,
            });
            const data = response.data;
            if (response.status === 200) {
                localStorage.setItem('token', reCaptchaToken);
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('role', data.role);
                toast.success('Login successful!');
                window.location.reload();
                onClose();
               if (localStorage.getItem('role') === 'Admin') {
                    window.location.href = '/admin';
                    toast.success('Login successful!');
                }
            } else {
                setError(data.message || 'Login failed.');
                toast.error('Login failed!');
            }
        } catch (error: unknown) {
            console.error('Error during login:', error);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.message || 'An error occurred during login. Please try again.');
            } else {
                setError('An error occurred during login. Please try again.');
            }
            toast.error('Login failed!');
        }
    };

    const onReCaptchaChange = (token: string | null) => {
        if (token) {
            setReCaptchaToken(token);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md w-1/3 flex flex-col">
                <img src={logo} alt="Nike Logo" className='float-left w-11 object-cover mb-5'/>
                <h2 className="text-lg font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">Email:</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="password">Password:</label>
                        <Input
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
                        className="flex justify-center"
                    />
                    <div className='flex flex-col w-full'>
                        <Button htmlType="submit" className="bg-blue-500 text-white p-2 rounded-2xl mt-4">
                            Login
                        </Button>
                        <Button onClick={onClose} className="p-2 mt-4 rounded-2xl">
                            Maybe Later
                        </Button>
                    </div>
                </form>
                <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="mt-4 text-blue-500 underline text-right">
                    Don't have an account? Sign Up
                </button>
                <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginModal;
