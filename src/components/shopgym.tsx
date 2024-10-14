import { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Spin, Alert } from 'antd';
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
    const [filterGender, setFilterGender] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5099/api/Products/category/4');
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

    const handleGenderFilterChange = (gender: string) => {
        setFilterGender(prev => 
            prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
        );
    };

    const filteredProducts = products.filter(product => 
        filterGender.length === 0 || filterGender.includes(product.gender)
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'price') {
            return a.price - b.price;
        } else if (sortOrder === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    return (
        <div className="max-w-[1440px] mx-auto flex flex-col p-10 gap-5">
        <div className="basket flex gap-4 px-36">
                <div className="w-full">
                    <img
                        src="https://static.nike.com/a/images/w_1920,c_limit/2ef6bf64-4d1f-4dcd-b8f2-81a4278f58d6/how-to-choose-the-right-training-shoe-for-you.jpg"
                        alt="Large Basketball Shoe"
                        className="w-auto h-96 mx-auto"
                    />
                </div>
            </div>
        <div className='max-w-[1440px] mx-auto flex p-10 gap-5 min-h-1000'>
            <div className='flex flex-col gap-2 w-1/5'>
                <h2 className='text-xl font-semibold'>Categories</h2>
                <div className='flex flex-col'>
                    <label className='flex items-center cursor-pointer mb-3' onClick={handleClickRun}>
                        Running Shoes
                    </label>
                    <label className='flex items-center cursor-pointer mb-3 px-3 py-2 bg-gray-100 text-black w-36' onClick={handleClickGym}>
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
                    <label className='flex items-center cursor-pointer mb-3' onClick={handleClickYoga}>
                        Yoga
                    </label>
                </div>
                <h2 className='text-xl font-semibold mt-4'>Filter by Gender</h2>
                <div className='flex flex-col'>
                    <label className='flex items-center cursor-pointer mb-3'>
                        <input 
                            type='checkbox' 
                            className='mr-2' 
                            onChange={() => handleGenderFilterChange('Male')}
                        />
                        Male
                    </label>
                    <label className='flex items-center cursor-pointer mb-3'>
                        <input 
                            type='checkbox' 
                            className='mr-2' 
                            onChange={() => handleGenderFilterChange('Female')}
                        />
                        Female
                    </label>
                    <label className='flex items-center cursor-pointer mb-3'>
                        <input 
                            type='checkbox' 
                            className='mr-2' 
                            onChange={() => handleGenderFilterChange('Kid')}
                        />
                        Kid
                    </label>
                </div>
            </div>
            <div className='w-4/5 flex flex-col'>
                <div className='flex justify-between p-4 mb-3 border rounded-xl'>
                    <h2 className='text-2xl font-semibold'>Gym Shoes</h2>
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
                    {sortedProducts.map(product => (
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
