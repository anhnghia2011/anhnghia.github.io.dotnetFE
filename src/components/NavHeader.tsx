// NavHeader.jsx
import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactPlayer from 'react-player';
import logo from '../assets/nikelogo.png';
import LoginModal from '../components/LoginModal'; // Import LoginModal

function NavHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý trạng thái modal

    const handleLoginClick = () => {
        setIsModalOpen(true); // Mở modal khi nhấn nút login
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Đóng modal
    };

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto'>
                <div className='flex justify-between p-4 gap-96 items-center mb-4'>
                    <div className='w-1/5'>
                        <img 
                            src={logo}
                            alt="logo" 
                            className='w-20 object-contain' 
                        />
                    </div>
                    <div className='w-6/12'>
                        <ul className='flex justify-around'>
                            <li>New & Featured</li>
                            <li>Men</li>
                            <li>Women</li>
                            <li>Kids</li>
                            <li>Sale</li>
                        </ul>
                    </div>
                    <div className='w-1/5 flex justify-between'>
                        <ShoppingBagIcon />
                        <FavoriteBorderIcon />
                        <button 
                            onClick={handleLoginClick} 
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <AccountCircleIcon style={{ marginRight: '8px' }} />
                            Login
                        </button>
                    </div>
                </div>

                <div className='w-full pb-4'>
                    <ReactPlayer
                        url="https://vimeo.com/1013189953"
                        playing={true}
                        loop={true}
                        volume={1}
                        muted={true} 
                        controls={true}
                        width="100%"
                        height="540px"
                    />
                </div>
            </div>

            {/* Render modal login */}
            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default NavHeader;
