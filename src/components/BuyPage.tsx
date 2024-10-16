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
        unitPrice: number; // Thêm trường unitPrice
        imageUrl: string; 
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
            orderId: 1, // Có thể để 0 nếu chưa có ID
            customerId: user.id, // Lấy userId từ localStorage
            orderDate: new Date().toISOString(), // Ngày hiện tại
            status: "Pending", // Trạng thái của đơn hàng
            totalAmount: orderInfo.totalAmount ?? 0,
            orderDetails: [
                {
                    orderDetailId: 1, // Có thể để 0 nếu chưa có ID
                    orderId: 1, // Có thể để 0 nếu chưa có ID
                    productId: orderInfo.productId,
                    quantity: orderInfo.quantity,
                    unitPrice: unitPrice, // Cung cấp giá đơn vị
                    totalPrice: orderInfo.totalAmount ?? 0, // Cung cấp thông tin về đơn hàng
                    order: null // Adding this field might resolve the issue
                },
            ]
        };
    
        // Gửi yêu cầu đến API
        try {
            const response = await axios.post('http://localhost:5099/api/Orders', orderDetails, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            message.success('Order placed successfully!');
            console.log('Order response:', response.data);
            localStorage.removeItem('orderInfo'); // Xóa thông tin sau khi đặt hàng
            window.location.href = '/'; // Chuyển đến trang chính hoặc trang khác
        } catch (error) {
            message.error('Failed to place order.');
            console.error('Error placing order:', (error as AxiosError).response?.data);
        }
    };
    
    if (!orderInfo) return null;

    return (
        <div className='shop'>
            <NavHeader />
            <div className="py-10 px-44">
                <h1 className="text-2xl font-bold">Order Summary</h1>
                <div className="flex items-center">
                    <img src={orderInfo.imgUrl} alt={`Product ${orderInfo.productId}`} className="w-32 h-32 object-cover mr-4" />
                    <div>
                        <p>Quantity: {orderInfo.quantity}</p>
                        <p>Size: {orderInfo.size}</p>
                        <p>Total Amount: ${orderInfo.totalAmount.toFixed(2)}</p>
                    </div>
                </div>

                <h2 className="text-lg mt-5">Shipping Address</h2>
                <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />

                <h2 className="text-lg mt-5">Payment Method</h2>
                <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e)}>
                    <Option value="">Select Payment Method</Option>
                    <Option value="Credit Card">Credit Card</Option>
                    <Option value="PayPal">PayPal</Option>
                </Select>

                <div className="mt-6">
                    <button
                        onClick={handleBuyNow}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BuyPage;
