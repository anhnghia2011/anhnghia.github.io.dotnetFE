import CloseIcon from '@mui/icons-material/Close';
import { Button, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import NavHeader from './NavHeader';

const { Option } = Select;

interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    size: number;
    productName: string;
    productImage: string;
    price: number;
}

interface User {
    id: number; 
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

function AddToCartPage() {
    const [user, setUser] = useState<User | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
    }, []);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            alert('Please log in to view your cart.');
            return;
        }
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:5099/api/Cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, []);

    const removeCartItem = async (cartItemId: number) => {
        try {
            await axios.delete(`http://localhost:5099/api/Cart/remove/${cartItemId}`, {
                data: { cartItemId },
            });
            const updatedCart = cartItems.filter(item => item.id !== cartItemId);
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };
const increaseQuantity = async (cartItemId: number) => {
    const updatedCart = cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    const updatedItem = updatedCart.find(item => item.id === cartItemId);
    if (updatedItem) {
        try {
            await axios.put(`http://localhost:5099/api/Cart/update/${cartItemId}`, {
                quantity: updatedItem.quantity,
            });
        } catch (error) {
            console.error('Error updating quantity in cart:', error);
        }
    }
};

// Decrease quantity
const decreaseQuantity = async (cartItemId: number) => {
    const updatedCart = cartItems.map(item => {
        if (item.id === cartItemId) {
            if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            } else {
                removeCartItem(cartItemId);
                return null; 
            }
        }
        return item;
    }).filter(item => item !== null); 

    setCartItems(updatedCart);
    const currentItem = updatedCart.find(item => item.id === cartItemId);
    if (currentItem) {
        try {
            await axios.put(`http://localhost:5099/api/Cart/update/${cartItemId}`, {
                quantity: currentItem.quantity,
            });
        } catch (error) {
            console.error('Error updating quantity in cart:', error);
        }
    }
};

const handleBuy = async () => {
    if (cartItems.length === 0) {
        alert('No products found in the cart.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5099/api/Order', {
            orderId: 0,
            customerId: user ? user.id : 0, 
            orderDate: new Date().toISOString(), 
            status: "Pending",
            totalAmount: parseFloat(calculateTotal()), 
            cartItems: cartItems.map(item => ({
                id: item.id,
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                productName: item.productName,
                productImage: item.productImage,
                price: item.price
            }))
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        // Clear the cart after successful order creation
        await axios.delete('http://localhost:5099/api/Cart/clear', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        alert(`Purchase successful! Your order ID is ${response.data.orderId}.`);
        window.location.reload(); // Optionally reload the page to reflect changes
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error making purchase:', error.response?.data || error.message);
        } else {
            console.error('Error making purchase:', error);
        }
        alert('Purchase failed. Please try again.');
    }
};

    return (
        <div className='shop'>
            <NavHeader />
            <div className="max-w-[1440px] mx-auto flex flex-col p-10 gap-5">
                <div className="flex justify-between p-4 mb-3 border rounded-xl">
                    <h2 className="text-2xl font-semibold">Your Cart</h2>
                </div>
                <div className='flex justify-center p-4'>
                    <div className="container mx-auto p-4 flex justify-center">
                        {cartItems.length > 0 ? (
                            <div className="w-full">
                                {cartItems.map((item: CartItem) => (
                                    <div key={item.id} className="border p-4 rounded-md flex gap-4 items-center mb-4 shadow-lg">
                                       <div className="flex flex-col items-center w-1/4">
                                       <img src={item.productImage} alt={item.productName} className="w-40 object-cover mb-2 rounded" />
                                        <div className="flex items-center mb-2 w-2/4">
                                            <button onClick={() => decreaseQuantity(item.id)} className="bg-red-500 text-white rounded px-2 py-1">-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item.id)} className="bg-green-500 text-white rounded px-2 py-1">+</button>
                                        </div>
                                       </div>
                                        <div className="w-full text-lg flex justify-between items-center">
                                       <div className='w-4/5'>
                                       <h3 className="font-semibold text-lg">{item.productName}</h3>
                                        <p className="text-gray-600">Size: {item.size}</p>
                                        <p className="text-gray-600 w-1/4">Price: ${(item.price).toFixed(2)}</p>
                                       </div>
                                           <CloseIcon 
                                            onClick={() => removeCartItem(item.id)}
                                            className="p-1 bg-slate-400 rounded-50 self-start -mt-12 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                    {user ? (
                        <div className="p-8 border rounded-lg shadow-lg h-fit mt-4 w-4/6">
                            <div>
                                <Input value={`${user.firstName} ${user.lastName}`} readOnly className="mb-2" />
                                <Input value={user.email} readOnly className="mb-2" />
                                <Input value={user.phoneNumber} readOnly className="mb-2" />
                                <TextArea placeholder="Enter your address" className="mb-2" />
                                <Select
                                    className="w-full border rounded-lg mb-2"
                                    placeholder="Select Payment Method"
                                >
                                    <Option value="card">Card Payment</Option>
                                    <Option value="vnpay">VNPay</Option>
                                </Select>
                                <div className="font-semibold text-lg mb-2">Total: ${calculateTotal()}</div>
                                <Button type="primary" onClick={handleBuy} disabled={cartItems.length === 0} className="w-40">
                                    Buy
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddToCartPage;
