import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactPlayer from 'react-player';
import logo from '../assets/nikelogo.png';

function NavHeader() {
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
                        <AccountCircleIcon />
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
        </div>
    );
}

export default NavHeader;
