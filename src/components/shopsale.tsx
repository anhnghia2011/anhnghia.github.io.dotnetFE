import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Alert, Select, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
    gender: string;
    isNew: boolean;
    discountPrice: number | null;
    category: {
        id: number;
        name: string;
        description: string;
    };
}

function Shoprun() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('name');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]); 
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5099/api/Products/');
                const newProducts = response.data.filter((product: Product) => product.discountPrice);
                setProducts(newProducts);
            } catch {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
       
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (product: Product) => {
        const newFavorites = favorites.some(fav => fav.id === product.id)
            ? favorites.filter(fav => fav.id !== product.id)
            : [...favorites, product];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const handleSortChange = (value: string) => setSortOrder(value);

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };
    // Assuming these are the available categories
    const categories = [
        { id: 1, name: 'Running Shoes' },
        { id: 2, name: 'Soccer Shoes' },
        { id: 3, name: 'Basketball Shoes' },
        { id: 4, name: 'Gym Shoes' },
        { id: 5, name: 'Dance Shoes' },
        { id: 6, name: 'Yoga Shoes' },
    ];

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'price') return a.price - b.price;
        if (sortOrder === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    const filteredProducts = sortedProducts.filter(product =>
        selectedCategories.length === 0 || selectedCategories.includes(product.categoryId)
    );

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategories(prevSelected => {
            if (prevSelected.includes(categoryId)) {
                // Remove category if already selected
                return prevSelected.filter(id => id !== categoryId);
            } else {
                // Add category if not selected
                return [...prevSelected, categoryId];
            }
        });
    };
    return (
        <div className="max-w-[1440px] mx-auto flex flex-col p-10 gap-5">
            <div className='flex p-10 gap-5'>
                <div className='flex flex-col gap-2 w-1/5'>
                    <h2 className='text-xl font-semibold'>Categories</h2>
                    <div className="flex flex-col">
                        {categories.map(category => (
                            <label key={category.id} className="flex items-center cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                    className="mr-2"
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold mt-4">Filter by</h2>
                        <div className="flex flex-col">
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/new-arrival')}>
                                New Arrival
                            </label>
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/male')}>
                                Men
                            </label>
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/female')}>
                                Women
                            </label>
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/kid')}>
                                Kid
                            </label>
                            <label className="flex items-center cursor-pointer mb-3 px-3 py-2 bg-gray-100 text-black w-36" onClick={() => navigate('/sale')}>
                                Sale
                            </label>
                        </div>
                </div>

                <div className="w-4/5 flex flex-col">
                    <div className="flex justify-between p-4 mb-3 border rounded-xl">
                        <h2 className="text-2xl font-semibold">Sale</h2>
                        <div className="flex gap-2">
                         <Select
                                    className="text-white"
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
                    <div className="product-list grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl min-h-1/2">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="cursor-pointer p-4 border rounded-lg hover:shadow-lg relative"
                                onClick={() => handleProductClick(product.id)}
                            >
                                {product.isNew && (
                                        <span className="absolute top-0 left-0 bg-green-200 text-green-700 px-2 py-1 text-xs font-semibold rounded-br-lg">
                                            New Arrival
                                        </span>
                                    )}
                                <img src={product.imageUrl} alt={product.name} className="w-full object-cover rounded-lg" />
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-gray-600">
                                        {product.discountPrice ? (
                                            <>
                                                <span className="line-through text-gray-400">${product.price.toFixed(2)}</span>
                                                <span className="ml-2 text-red-500">${product.discountPrice.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span>${product.price.toFixed(2)}</span>
                                        )}
                                    </p>
                                <div className="flex justify-between items-center mt-2">
                                        <span onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}>
                                            {favorites.some(fav => fav.id === product.id) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                                        </span>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shoprun;
