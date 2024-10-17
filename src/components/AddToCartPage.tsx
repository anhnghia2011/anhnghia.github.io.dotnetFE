import { useState, useEffect } from 'react';
import NavHeader from './NavHeader';
import Footer from './Footer';
import { Select } from 'antd';

interface Product {
    id: string | number;
    name: string;
    imageUrl: string;
    price: number;
}

function AddToCartPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('price');

    // Load cart items from localStorage
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cart');
        setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
    }, []);

    // Remove item from cart
    const removeCartItem = (productId: string | number) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload();
    };

    // Handle sorting
    const handleSortChange = (value: string) => {
        setSortOrder(value);
        const sortedCartItems = [...cartItems].sort((a, b) => {
            if (value === 'price') {
                return a.price - b.price;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        setCartItems(sortedCartItems);
    };

    return (
        <div className='shop' >
            <NavHeader />
            <div className="max-w-[1440px] mx-auto flex flex-col p-10 gap-5">
                <div className="flex justify-between p-4 mb-3 border rounded-xl">
                    <h2 className="text-2xl font-semibold">Your Cart</h2>
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
                <div className="container mx-auto p-4">
                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {cartItems.map((product) => (
                                <div key={product.id} className="border p-4 rounded-md">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                    <button 
                                        onClick={() => removeCartItem(product.id)}
                                        className="text-red-500 mt-2"
                                    >
                                        Remove from Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddToCartPage;
