import React, { useState } from 'react';
import { Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Footer: React.FC = () => {
    const navigation = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const feedbackData = {
            name,
            email,
            message: feedback,
        };
        
        try {
            const response = await axios.post('http://localhost:5099/api/Feedback', feedbackData);
            console.log("Feedback submitted successfully:", response.data);
            message.success('Feedback submitted successfully!');
        } catch (error) {
            console.error("Error submitting feedback:", error);
            message.error('Failed to submit feedback. Please try again.');
        }
        setName('');
        setEmail('');
        setFeedback('');
    };

    const handleBasketball = () => {
        navigation('/basketball-shoe');
    }

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto p-4'>
                <img src="https://th.bing.com/th/id/OIP.zfudsWqmpHrXv8vV2clhpwHaEK?w=314&h=180&c=7&r=0&o=5&pid=1.7" className='flex justify-center mx-auto' alt="Logo" />
                <div className='my-10'>
                    <img src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2226,c_limit/b57f6c65-1e29-47cd-9c4c-ec43fad89a99/nike-just-do-it.jpg" alt="Promotional Banner" />
                    <div className="flex flex-col items-center justify-center w-full pt-5 gap-2">
                        <p className="font-normal font-sans">Men’s Jordan Spizike</p>
                        <h1 className="font-bold text-6xl">IT'S GOTTA BE THE REMIX</h1>
                        <p className="font-normal font-sans">It’s back like it never left. Five Air Jordan retros cut it up in the classic Spizike.</p>
                        <button className="rounded-xl px-3 py-1 bg-black text-white" onClick={handleBasketball}>Shop Basketball</button>
                    </div>
                </div>
                <img src="https://th.bing.com/th/id/OIP.AmW04-XKxCF23w1Vns3pCAHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7" className='flex justify-center mx-auto' alt="Footer Image" />
                <div className='bg-gray-100 p-4 rounded mb-4'>
                    <h2 className='text-lg font-semibold'>We value your feedback</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col mt-2'>
                        <Input 
                            type='text' 
                            placeholder='Your name' // Thêm trường tên
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className='p-2 border rounded mb-2' 
                            required
                        />
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
                
                <ul className='flex justify-around bg-white-100 p-4 w-full'>
                    <li>© 2024 Nike, Inc. All Rights Reserved</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>Accessibility Statement</li>
                </ul>
            </div>  
        </div>
    );
}

export default Footer;
