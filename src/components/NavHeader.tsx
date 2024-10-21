import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/nikelogo.png';
import LoginModal from './LoginModal';

interface User {
    lastName: string;
}

function NavHeader() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [lastName, setLastName] = useState(''); 
    const [cartItems, setCartItems] = useState(0); 

    const handclickhome = () => {
        navigate('/');
    }

    const handleFavoriteClick = () => {
        navigate('/favorites'); 
    };

    const handleAddToCartClick = () => {
        navigate('/add-to-cart'); 
    }

    const handleMale = () => {
        navigate('/male');
    }
    const handleFemale = () => {
        navigate('/female');
    }
    const handleKid = () => {
        navigate('/kid');
    }
    const handleNew = () => {
        navigate('/new-arrival');
    }
    const handleSale = () => {
        navigate('/sale');
    }

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        if (userData && userData.lastName) {
            setIsLoggedIn(true); 
            setLastName(userData.lastName); 
        }

        const storedCartItems = localStorage.getItem('cart');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            setCartItems(parsedCartItems.length); 
        } else {
            setCartItems(0); 
        }
    }, []);

    const handleLoginSuccess = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        setLastName(user.lastName);
        setIsModalOpen(false); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto'>
                <div className='flex justify-between p-4 gap-96 items-center mb-4'>
                    <div className='w-1/5'>
                        <img 
                            src={logo}
                            alt="logo" 
                            className='w-20 object-contain cursor-pointer' 
                            onClick={handclickhome}
                        />
                    </div>
                    <div className='w-6/12'>
                        <ul className='flex justify-around gap-2'>
                            <li className='cursor-pointer' onClick={handleNew}>New & Featured</li>
                            <li className='cursor-pointer' onClick={handleMale}>Men</li>
                            <li className='cursor-pointer' onClick={handleFemale}>Women</li>
                            <li className='cursor-pointer' onClick={handleKid}>Kids</li>
                            <li className='cursor-pointer' onClick={handleSale}>Sale</li>
                        </ul>
                    </div>
                    <div className='w-1/5 flex justify-between items-center gap-4'>
                        <div className='relative'>
                            <ShoppingBagIcon className='cursor-pointer' onClick={handleAddToCartClick} />
                            {cartItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex justify-center items-center">
                                    {cartItems}
                                </span>
                            )}
                        </div>
                        <FavoriteBorderIcon onClick={handleFavoriteClick} className='cursor-pointer'/>
                        <div className="relative group">
                           <button 
                               className='flex items-center rounded-2xl bg-red-200 px-2 py-1 shadow-lg'
                               onClick={() => !isLoggedIn && setIsModalOpen(true)} 
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

                           {isLoggedIn && (
                               <div 
                                   className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        className='object-cover shop-video'
                    />
                </div>

                <LoginModal 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal}
                    onLoginSuccess={handleLoginSuccess}
                />
            </div>
        </div>
    );
}

export default NavHeader;
