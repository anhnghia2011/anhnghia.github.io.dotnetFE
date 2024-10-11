import React, { useState } from 'react';
import { Input } from 'antd';

const Footer: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Feedback submitted:", { email, feedback });
        setEmail('');
        setFeedback('');
    };

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto p-4'>
                {/* Feedback Section */}
                <div className='bg-gray-100 p-4 rounded mb-4'>
                    <h2 className='text-lg font-semibold'>We value your feedback</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col mt-2'>
                        <Input 
                            type='email' 
                            placeholder='Your email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='p-2 border rounded mb-2' 
                            required
                        />
                        <textarea 
                            placeholder='Your feedback' 
                            value={feedback} 
                            onChange={(e) => setFeedback(e.target.value)} 
                            className='p-2 border rounded mb-2' 
                            rows={4} 
                            required
                        />
                        <button 
                            type='submit' 
                            className='bg-blue-500 text-white p-2 rounded w-52 mx-auto'
                        >
                            Send Feedback
                        </button>
                    </form>
                </div>
                
                {/* Footer Section */}
                <ul className='flex justify-around bg-white-100 p-4 w-full'>
                    <li>© 2021 Nike, Inc. All Rights Reserved</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>Accessibility Statement</li>
                </ul>
            </div>  
        </div>
    );
}

export default Footer;
