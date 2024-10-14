import { Alert, Select, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Shoprun() {
    const navigate = useNavigate();

    const handleClickRun = () => {
        navigate(`/run-shoe`);
    }
    const handleClickSoccer = () => {
        navigate(`/soccer-shoe`);
    }
    const handleClickBasketball = () => {
        navigate(`/basketball-shoe`);
    }
    const handleClickGym = () => {
        navigate(`/gym-shoe`);
    }
    const handleClickDance = () => {
        navigate(`/dance-shoe`);
    }
    const handleClickYoga = () => {
        navigate(`/yoga-shoe`);
    }

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

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('price');
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5099/api/Products/category/1');
                setProducts(response.data);
            } catch {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSortChange = (value: string) => {
        setSortOrder(value);
    };

    const handleGenderChange = (gender: string) => {
        setSelectedGenders(prev => {
            if (prev.includes(gender)) {
                return prev.filter(g => g !== gender);
            } else {
                return [...prev, gender];
            }
        });
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'price') {
            return a.price - b.price;
        } else if (sortOrder === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    // Filter products based on selected gender
    const filteredProducts = sortedProducts.filter(product => {
        return selectedGenders.length === 0 || selectedGenders.includes(product.gender);
    });

    return (
        <div className="max-w-[1440px] mx-auto flex flex-col p-10 gap-5">
        <div className="flex gap-4">
                <div className="w-full flex pl-20">
                    <img
                        src="https://static.nike.com/a/images/w_1920,c_limit/ae06cfe1-c675-4e99-b957-f0f1571c7141/what-to-wear-to-yoga-class-5-outfit-ideas-by-nike.jpg"
                        alt="Large Basketball Shoe"
                        className="w-auto h-96"
                    />
                     <img
                            src="https://static.nike.com/a/images/t_prod/w_1920,c_limit/21e6fa52-b830-4b07-89b8-53440543428e/best-clothing-for-hot-yoga-by-nike.jpg"
                            alt="Large Basketball Shoe"
                            className="w-auto h-96"
                        />
                </div>
            </div>
        <div className='flex p-10 gap-5'>
       <div className='flex flex-col gap-2 w-1/5'>
               <h2 className='text-xl font-semibold'>Categories</h2>
               <div className='flex flex-col'>
                 <label className='flex items-center cursor-pointer mb-3 ' onClick={handleClickRun}>
                     Running
                 </label>
                 <label className='flex items-center cursor-pointer mb-3' onClick={handleClickGym}>
                     Gym
                 </label>
                 <label className='flex items-center cursor-pointer mb-3' onClick={handleClickBasketball}>
                     Basketball
                 </label>
                 <label className='flex items-center cursor-pointer mb-3' onClick={handleClickDance}>
                     Dance
                 </label>
                 <label className='flex items-center cursor-pointer mb-3' onClick={handleClickSoccer}>
                     Soccer
                 </label>
                 <label className='flex items-center cursor-pointer mb-3 px-3 py-2 bg-gray-100 text-black w-36' onClick={handleClickYoga}>
                     Yoga
                 </label>
               </div>
               <h2 className='text-xl font-semibold mt-4'>Filter by</h2>
                <div className='flex flex-col'>
                  <label className='flex items-center cursor-pointer mb-3'>
                      <input 
                          type='checkbox' 
                          className='mr-2' 
                          checked={selectedGenders.includes('Male')} 
                          onChange={() => handleGenderChange('Male')} 
                      />
                      Male
                  </label>
                  <label className='flex items-center cursor-pointer mb-3'>
                      <input 
                          type='checkbox' 
                          className='mr-2' 
                          checked={selectedGenders.includes('Female')} 
                          onChange={() => handleGenderChange('Female')} 
                      />
                      Female
                  </label>
                  <label className='flex items-center cursor-pointer mb-3'>
                      <input 
                          type='checkbox' 
                          className='mr-2' 
                          checked={selectedGenders.includes('Kid')} 
                          onChange={() => handleGenderChange('Kid')} 
                      />
                      Kid
                  </label>
                </div>
            </div>
            <div className='w-4/5 flex flex-col'>
                <div className='flex justify-between p-4 mb-3 border rounded-xl'>
                    <h2 className='text-2xl font-semibold'>Yoga Shoes</h2>
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
                {loading && <Spin size="large" />}
                {error && <Alert message={error} type="error" />}
                <div className="product-list grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl min-h-500">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card border rounded-lg shadow-md p-4">
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-48 object-cover mb-4" 
                            />
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className='text-black font-medium'>{product.gender}'s shoe</p>
                            <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
                            {product.discountPrice && (
                                <p className="text-red-500">Discount: ${product.discountPrice.toFixed(2)}</p>
                            )}
                            {product.isNew && <span className="text-green-500">New Arrival</span>}
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Shoprun;
