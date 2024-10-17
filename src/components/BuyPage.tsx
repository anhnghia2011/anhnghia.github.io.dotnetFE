import { useEffect, useState } from 'react';
import { Select, message } from 'antd'; 
import Footer from './Footer';
import NavHeader from './NavHeader';
import axios, { AxiosError } from 'axios';

const { Option } = Select;

function BuyPage() {

    interface OrderInfo {
        productId: number;
        quantity: number;
        imgUrl: string;
        size: number;
        totalAmount: number;
        unitPrice: number;
        imageUrl: string; 
        name: string;
    }

    const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const savedOrderInfo = localStorage.getItem('orderInfo');
        if (savedOrderInfo) {
            setOrderInfo(JSON.parse(savedOrderInfo));
        } else {
            message.error('No order information found. Please go back to the product page.');
        }
    }, []);

    const handleBuyNow = async () => {
        if (!address || !paymentMethod) {
            message.error('Please fill out all fields');
            return;
        }
    
        const orderInfoString = localStorage.getItem('orderInfo');
        const orderInfo = orderInfoString ? JSON.parse(orderInfoString) : null;
        if (!orderInfo) {
            message.error('Order information is missing.');
            return;
        }
    
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const token = localStorage.getItem('token');
    
        if (!user || !user.id) {
            message.error('User ID not found. Please log in.');
            return;
        }
    
        // Validate unit price
        const unitPrice = orderInfo.unitPrice ?? 0;
        if (unitPrice <= 0) {
            message.error('Unit price must be greater than 0.');
            return;
        }
    
        // Tạo orderDetails
        const orderDetails = {
            orderId: 1,
            customerId: user.id, 
            orderDate: new Date().toISOString(), 
            status: "Pending", 
            totalAmount: orderInfo.totalAmount ?? 0,
            orderDetails: [
                {
                    orderDetailId: 1,
                    orderId: 1,
                    productId: orderInfo.productId,
                    quantity: orderInfo.quantity,
                    unitPrice: unitPrice,
                    totalPrice: orderInfo.totalAmount ?? 0,
                    order: null 
                },
            ]
        };
    
       
try {
            const response = await axios.post('http://localhost:5099/api/Orders', orderDetails, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            message.success('Order placed successfully!');
            console.log('Order response:', response.data);
            localStorage.removeItem('orderInfo');
            window.location.href = '/';
        } catch (error) {
            message.error('Failed to place order.');
            console.error('Error placing order:', (error as AxiosError).response?.data);
        }
    };
    
    if (!orderInfo) return null;

    return (
        <div className="shop">
        <NavHeader />
        <div className="py-10 px-44">
            <h1 className="text-3xl font-bold mb-10 text-center">Order Summary</h1>
            <div className="flex w-full justify-center items-start">
                {/* Product Summary */}
                <div className="flex items-center border rounded-3xl shadow-lg p-10 bg-white">
                    <img src={orderInfo.imgUrl} alt={`Product ${orderInfo.productId}`} className="w-64 h-64 object-cover mr-6" />
                    <div>
                        <h2 className="text-xl font-semibold">{orderInfo.name}</h2>
                        <p className="text-gray-700">Quantity: {orderInfo.quantity}</p>
                        <p className="text-gray-700">Size: {orderInfo.size}</p>
                        <p className="text-gray-700">Price: ${orderInfo.unitPrice.toFixed(2)}</p>
                    </div>
                </div>

                {/* Shipping and Payment */}
                <div className="w-2/5 ml-10">
                    <h2 className="text-lg font-semibold my-5">Shipping Address</h2>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />

                    <h2 className="text-lg font-semibold my-5">Payment Method</h2>
                    <Select value={paymentMethod} onChange={(value) => setPaymentMethod(value)} className="w-full border rounded-lg">
                        <Option value="">Select Payment Method</Option>
                        <Option value="Credit Card">Credit Card</Option>
                        <Option value="PayPal">PayPal</Option>
                    </Select>
                    
                    <p className="text-lg font-bold mt-5">Total Amount: ${orderInfo.totalAmount.toFixed(2)}</p>

                    <div className="mt-6">
                        <button
                            onClick={handleBuyNow}
                            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition duration-300"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default BuyPage;
