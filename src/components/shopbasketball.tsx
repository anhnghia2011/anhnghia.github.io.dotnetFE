import { Alert, Select, Spin, Button, Badge, Dropdown, Menu } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';

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
function Shoprun() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('price');
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5099/api/Products/category/3');
                setProducts(response.data);
            } catch {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const storedFavorites = localStorage.getItem('favorites');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const addToCart = (product: Product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const toggleFavorite = (product: Product) => {
        const newFavorites = favorites.some(fav => fav.id === product.id)
            ? favorites.filter(fav => fav.id !== product.id)
            : [...favorites, product];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const handleSortChange = (value: string) => setSortOrder(value);
    const handleGenderChange = (gender: string) => {
        setSelectedGenders(prev =>
            prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
        );
    };

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'price') return a.price - b.price;
        if (sortOrder === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    const filteredProducts = sortedProducts.filter(product =>
        selectedGenders.length === 0 || selectedGenders.includes(product.gender)
    );

    const cartMenu = (
        <Menu>
            {cart.length === 0 ? (
                <Menu.Item key="empty">Your cart is empty</Menu.Item>
            ) : (
                cart.map(item => (
                    <Menu.Item key={item.id}>
                        <div className="flex items-center">
                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover mr-2" />
                            <div>
                                <h3>{item.name}</h3>
                                <p>${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </Menu.Item>
                ))
            )}
        </Menu>
    );

    return (
        <div className="max-w-[1440px] mx-auto flex flex-col p-10 gap-5">
            <div className="flex gap-4">
                <div className="w-full flex justify-center">
                    <img
                        src="https://static.nike.com/a/images/w_1920,c_limit/7d7c9bf9-1717-458f-8ebe-3b7297c5ae9f/the-best-nike-basketball-shorts-for-kids.jpg"
                        alt="Large Basketball Shoe"
                        className="w-auto h-96"
                    />
                    <img
                        src="https://static.nike.com/a/images/w_1920,c_limit/c31bdcf5-feb7-405f-ad8b-4b2126a9cfb4/the-most-comfortable-basketball-shoes-by-nike.jpg"
                        alt="Large Basketball Shoe"
                        className="w-auto h-96"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-end hidden">
                    <Dropdown overlay={cartMenu} trigger={['hover']}>
                        <Badge count={cart.length}>
                            <Button icon={<ShoppingCartOutlined />} />
                        </Badge>
                    </Dropdown>
                </div>

                <div className="flex p-10 gap-5">
                    <div className="flex flex-col gap-2 w-1/5">
                        <h2 className="text-xl font-semibold">Categories</h2>
                        <div className="flex flex-col">
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/run-shoe')}>
                                Running
                            </label>
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/gym-shoe')}>
                                Gym
                            </label>
                            <label className="flex items-center cursor-pointer mb-3 px-3 py-2 bg-gray-100 text-black w-36" onClick={() => navigate('/basketball-shoe')}>
                                Basketball
                            </label>
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/dance-shoe')}>
                                Dance
                            </label>
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/soccer-shoe')}>
                                Soccer
                            </label>
                            <label className="flex items-center cursor-pointer mb-3" onClick={() => navigate('/yoga-shoe')}>
                                Yoga
                            </label>
                        </div>

                        <h2 className="text-xl font-semibold mt-4">Filter by</h2>
                        <div className="flex flex-col">
                            {['Male', 'Female', 'Kid'].map(gender => (
                                <label key={gender} className="flex items-center cursor-pointer mb-3">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={selectedGenders.includes(gender)}
                                        onChange={() => handleGenderChange(gender)}
                                    />
                                    {gender}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="w-4/5 flex flex-col">
                        <div className="flex justify-between p-4 mb-3 border rounded-xl">
                            <h2 className="text-2xl font-semibold">Basketball shoes</h2>
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
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
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
                                        <Button 
                                            onClick={(e) => { 
                                                e.stopPropagation();
                                                addToCart(product);
                                                window.location.reload();
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
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
        </div>
    );
}

export default Shoprun;
