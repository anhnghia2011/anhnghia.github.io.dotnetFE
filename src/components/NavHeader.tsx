import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactPlayer from 'react-player';
import logo from '../assets/nikelogo.png';
import LoginModal from '../components/LoginModal';

function NavHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for login modal
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
    const [lastName, setLastName] = useState(''); // State for user's last name
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for profile dropdown

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        const userDataString = localStorage.getItem('user'); // Retrieve user data from localStorage
        const userData = userDataString ? JSON.parse(userDataString) : null; // Parse only if not null
        if (userData && userData.lastName) {
            setIsLoggedIn(true); // User is logged in
            setLastName(userData.lastName); // Set the user's last name
        }
    }, []);

    const handleLoginClick = () => {
        if (!isLoggedIn) {
            setIsModalOpen(true); // Open login modal if not logged in
        } else {
            setIsDropdownOpen((prev) => !prev); // Toggle dropdown if logged in
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close login modal
    };

    const handleLogout = () => {
        // Clear local storage and log the user out
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsDropdownOpen(false);
        window.location.reload(); // Reload page to reflect logout
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
                    <div className='w-1/5 flex justify-between items-center gap-4'>
                        <ShoppingBagIcon />
                        <FavoriteBorderIcon />
                        <div className="relative">
                            <button 
                                onClick={handleLoginClick} 
                                className='flex items-center rounded-2xl bg-red-200 px-2 py-1'
                                onMouseEnter={() => setIsDropdownOpen(true)} // Open dropdown on hover
                                onMouseLeave={() => setIsDropdownOpen(false)} // Close dropdown when not hovering
                            >
                                {isLoggedIn ? (
                                    <>
                                        <span>{lastName}</span> 
                                        <AccountCircleIcon style={{ marginLeft: '8px' }} />
                                    </>
                                ) : (
                                    <>
                                        <AccountCircleIcon style={{ marginRight: '8px' }} />
                                        <span>Login</span>
                                    </>
                                )}
                            </button>

                            {/* Dropdown menu for profile */}
                            {isLoggedIn && isDropdownOpen && (
                                <div 
                                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                                        Profile
                                    </a>
                                    <button 
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
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

            {/* Render the login modal */}
            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default NavHeader;
