import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Input } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/nikelogo.png';
import LoginModal from './LoginModal';


 
function NavHeader() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [lastName, setLastName] = useState('');
    interface Product {
        id: number;
        name: string;
        imageUrl: string;
        price: number;
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        if (userData && userData.lastName) {
            setIsLoggedIn(true); 
            setLastName(userData.lastName); 
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5099/api/Products')
            .then(response => {
                const data = response.data;
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products', error);
            });
    }, []);

    useEffect(() => {
        const results = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const handleInputFocus = () => {
        setIsSearching(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setIsSearching(false), 200);
    };

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto'>
                <div className='flex justify-between p-4 gap-40 items-center mb-4'>
                    <div className='w-1/5'>
                        <img 
                            src={logo}
                            alt="logo" 
                            className='w-20 object-contain cursor-pointer' 
                            onClick={() => navigate('/')}
                        />
                    </div>
                    <div className='w-6/12'>
                        <ul className='flex justify-around gap-2'>
                            <li className='cursor-pointer' onClick={() => navigate('/new-arrival')}>New & Featured</li>
                            <li className='cursor-pointer' onClick={() => navigate('/male')}>Men</li>
                            <li className='cursor-pointer' onClick={() => navigate('/female')}>Women</li>
                            <li className='cursor-pointer' onClick={() => navigate('/kid')}>Kids</li>
                            <li className='cursor-pointer' onClick={() => navigate('/sale')}>Sale</li>
                        </ul>
                    </div>
                    <div className='flex justify-between items-center gap-4'>
                        <div className='relative'>
                            <Input
                                placeholder='Search'
                                className='w-60 rounded-2xl'
                                onFocus={handleInputFocus} 
                                onBlur={handleInputBlur}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {isSearching && searchTerm && (
                                <ul className="absolute z-10 bg-white shadow-lg rounded-lg mt-2 max-h-96 overflow-auto">
                                    {filteredProducts.map(product => (
                                             <li key={product.id} className="p-2 hover:bg-gray-200 flex items-center cursor-pointer gap-4" onClick={() => handleProductClick(product.id)}>
                                                <img src={product.imageUrl} alt={product.name} className="w-16 object-cover rounded-md" />
                                            <div className='flex flex-col'>
                                                <p>{product.name}</p>
                                                <p>${product.price}</p>
                                                </div>
                                             </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <ShoppingBagIcon onClick={() => navigate('/add-to-cart')} className='cursor-pointer'/>
                        <FavoriteBorderIcon onClick={() => navigate('/favorites')} className='cursor-pointer'/>
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
                                       onClick={() => {
                                           localStorage.removeItem('user');
                                           localStorage.removeItem('token');
                                           setIsLoggedIn(false);
                                           window.location.reload();
                                       }}
                                   >
                                       Logout
                                   </button>
                               </div>
                           )}
                       </div>
                  </div>
                </div>

                <div className='w-full pb-4 bg-black shop-video'>
                    <img src='https://www.kicks.com.co/media/wysiwyg/BannerNike_Header.gif' alt='shop' className='w-full h-96 object-cover'/>
                </div>

                <LoginModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
}

export default NavHeader;
