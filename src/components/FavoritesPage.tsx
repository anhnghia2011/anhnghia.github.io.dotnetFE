import { useState, useEffect } from 'react';
import NavHeader from './NavHeader';
import Footer from './Footer';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    gender: string;
    discountPrice?: number;
    isNew?: boolean;
    imageUrl: string;
}

function FavoritesPage() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('price');

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }, []);

    const removeFavorite = (productId: string | number) => {
        const updatedFavorites = favorites.filter(item => item.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    
    const handleSortChange = (value: string) => {
        setSortOrder(value);
        const sortedFavorites = [...favorites].sort((a, b) => {
            if (value === 'price') {
                return a.price - b.price;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        setFavorites(sortedFavorites);
    }
    
    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };


    return (
        <div>
            <NavHeader />
            <div className='max-w-[1440px] mx-auto flex flex-col p-10 gap-5'>
                        <div className='flex justify-between p-4 mb-3 border rounded-xl'>
                            <h2 className='text-2xl font-semibold'>Your Favorites</h2>
                            <div className='flex gap-2'>
                                <Select
                                    className='text-white'
                                    defaultValue={sortOrder}
                                    onChange={handleSortChange}
                                    options={[
                                        { label: 'Sort by Price', value: 'price' },
                                        { label: 'Sort by Name', value: 'name' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="container mx-auto p-4">
                           {favorites.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 cursor-pointer">
                                   {favorites.map((product) => (
                                       <div key={product.id} className="border p-4 rounded-md">
                                          <img src={product.imageUrl} alt={product.name} className="w-full object-cover rounded-md" />
                                          <h3 className="font-semibold text-lg">{product.name}</h3>
                                          <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                          <button 
                                              onClick={() => removeFavorite(product.id)}
                                              className="text-red-500 mt-2"
                                          >
                                              Remove from Favorites
                                           </button>
                                           <AddShoppingCartIcon  onClick={() => handleProductClick(product.id)} className='float-right'/>
                                         </div>
                                     ))}
                                 </div>
                                ) : (
                                    <p>You have no favorite items.</p>
                                )}
                                </div>
                          </div>

            <Footer />
        </div>
    );
}

export default FavoritesPage;
