import { useState, useEffect } from 'react';
import NavHeader from './NavHeader';
import Footer from './Footer';
import { Select, Button } from 'antd';
import axios from 'axios';

interface Product {
    id: string | number;
    productId: number; // ID sản phẩm từ API
    quantity: number;
    size: string; // Change to string for size
    price: number;  // Add price to Product interface
    name: string;   // Add name to Product interface
}

function AddToCartPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('price');

    // Load cart items from localStorage
    useEffect(() => {
        const storedCartItems = localStorage.getItem('product');
        setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
    }, []);

    // Remove item from cart
    const removeCartItem = (productId: string | number) => {
        const updatedCart = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('product', JSON.stringify(updatedCart));
    };

    // Handle sorting
    const handleSortChange = (value: string) => {
        setSortOrder(value);
        const sortedCartItems = [...cartItems].sort((a, b) => {
            if (value === 'price') {
                return a.price - b.price; // Sort by price
            } else {
                return a.name.localeCompare(b.name); // Sort by name
            }
        });
        setCartItems(sortedCartItems);
    };

    // Buy all items in the cart
    const handleBuy = async () => {
        try {
            const response = await axios.post('http://localhost:5099/api/Order', {
                items: cartItems,
            });
            console.log('Purchase successful:', response.data);
            // Clear cart after purchase
            localStorage.removeItem('product');
            setCartItems([]); // Reset cart state
            alert('Purchase successful!');
        } catch (error) {
            console.error('Error making purchase:', error);
            alert('Purchase failed.');
        }
    };

    return (
        <div className='shop'>
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
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-gray-600">Product ID: {product.id}</p>
                                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                                    <p className="text-gray-600">Size: {product.size}</p>
                                    <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => removeCartItem(product.productId)}
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
                <Button 
                    type="primary" 
                    onClick={handleBuy}
                    disabled={cartItems.length === 0} // Disable button if cart is empty
                >
                    Buy
                </Button>
            </div>
            <Footer />
        </div>
    );
}

export default AddToCartPage;
