import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Pagination, Spin, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import NavHeader from './NavHeader';

interface Order {
    orderId: number;
    orderDate: string;
    totalAmount: number;
    status: string;
}

interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

function Profilepage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [view, setView] = useState<'profile' | 'orderHistory'>('profile');
    const [info, setInfo] = useState<UserInfo | null>(null);
    const [currentInfo, setCurrentInfo] = useState<UserInfo | null>(null); 
    const [currentPassword, setCurrentPassword] = useState<string>(''); 
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>(''); 
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [noOrders, setNoOrders] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ordersPerPage] = useState<number>(6);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            const parsedInfo: UserInfo = JSON.parse(userInfo);
            setInfo(parsedInfo);
            setCurrentInfo(parsedInfo);

            const fetchOrders = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:5099/api/Order/user/${parsedInfo.id}`);
                    setOrders(response.data);
                    setNoOrders(response.data.length === 0);
                } catch {
                    setNoOrders(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, []);
    const handleFormSubmit = async (values: UserInfo) => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (user) {
            const updatedValues: UserInfo = { ...values, id: user.id };

            try {
                if (showChangePassword) {
                    const passwordUpdateResponse = await axios.put(`http://localhost:5099/api/Customers/updatepassword/${user.id}`, {
                        newPassword,
                        currentPassword,
                    });
                    if (passwordUpdateResponse.status === 200) {
                        message.success('Password changed successfully!');
                        setShowChangePassword(false); 
                        window.location.reload();
                    }
                } else {
                    const response = await axios.put(`http://localhost:5099/api/Customers/update/${user.id}`, updatedValues);
                    if (response.status === 200) {
                        message.success('Profile updated successfully!');
                        localStorage.setItem('user', JSON.stringify(updatedValues));
                        window.location.reload();
                        setInfo(updatedValues);
                    }
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                message.error('Failed to update profile.');
            }
        }
    };

    const handleCancelChangePassword = () => {
        setShowChangePassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const isProfileChanged = () => {
        if (!info || !currentInfo) return false;
        return (
            info.firstName !== currentInfo.firstName ||
            info.lastName !== currentInfo.lastName ||
            info.phoneNumber !== currentInfo.phoneNumber ||
            info.email !== currentInfo.email ||
            (showChangePassword && (currentPassword || newPassword || confirmPassword)) 
        );
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const openOrderModal = (order: Order) => {
        setSelectedOrder(order);
    };

    const closeOrderModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="shop min-h-screen">
            <NavHeader />
            <div className="py-20 px-10 md:px-44">
                <div className="flex justify-center space-x-6 mb-12 m-auto">
                    <button 
                        onClick={() => setView('profile')} 
                        className={`text-2xl md:text-4xl font-semibold px-4 py-2 rounded-lg transition-all ${view === 'profile' ? 'text-white bg-blue-600 shadow-lg' : 'text-gray-600 bg-gray-200 hover:bg-gray-300'}`}>
                        Profile
                    </button>
                    <button 
                        onClick={() => setView('orderHistory')} 
                        className={`text-2xl md:text-4xl font-semibold px-4 py-2 rounded-lg transition-all ${view === 'orderHistory' ? 'text-white bg-blue-600 shadow-lg' : 'text-gray-600 bg-gray-200 hover:bg-gray-300'}`}>
                        Order History
                    </button>
                </div>

                {view === 'profile' && info && (
                    <div className="bg-white rounded-lg shadow-md p-8 transition-all border-t-4 space-y-6 w-full md:w-1/3 mx-auto">
                        <Form layout="vertical" initialValues={info} onFinish={handleFormSubmit} className="space-y-4">
                            <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                                <Input 
                                    placeholder="Enter your first name" 
                                    value={currentInfo?.firstName || ''} 
                                    onChange={e => setCurrentInfo(currentInfo ? { ...currentInfo, firstName: e.target.value || '' } : null)}
                                />
                            </Form.Item>

                            <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                                <Input 
                                    placeholder="Enter your last name" 
                                    value={currentInfo?.lastName || ''} 
                                    onChange={e => setCurrentInfo(currentInfo ? { ...currentInfo, lastName: e.target.value } : null)} 
                                />
                            </Form.Item>

                            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                                <Input 
                                    placeholder="Enter your phone number" 
                                    value={currentInfo?.phoneNumber || ''} 
                                    onChange={e => setCurrentInfo(currentInfo ? { ...currentInfo, phoneNumber: e.target.value } : null)} 
                                />
                            </Form.Item>

                            <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Please enter a valid email' }, { required: true, message: 'Please enter your email' }]}>
                                <Input 
                                    placeholder="Enter your email" 
                                    value={currentInfo?.email || ''} 
                                    onChange={e => setCurrentInfo(currentInfo ? { ...currentInfo, email: e.target.value } : null)} 
                                />
                            </Form.Item>

                            {showChangePassword ? (
                                <>
                                    <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true, message: 'Please enter your current password' }]}>
                                        <Input.Password 
                                            placeholder="Enter your current password" 
                                            prefix={<LockOutlined />} 
                                            value={currentPassword} 
                                            onChange={e => setCurrentPassword(e.target.value)} 
                                        />
                                    </Form.Item>

                                    <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: 'Please enter your new password' }]}>
                                        <Input.Password 
                                            placeholder="Enter your new password" 
                                            prefix={<LockOutlined />} 
                                            value={newPassword} 
                                            onChange={e => setNewPassword(e.target.value)} 
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Confirm New Password"
                                        name="confirmPassword"
                                        dependencies={['newPassword']}
                                        rules={[
                                            { required: true, message: 'Please confirm your new password' },
                                            () => ({
                                                validator(_, value) {
                                                    if (!value || newPassword === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The two passwords do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password 
                                            placeholder="Confirm your new password" 
                                            prefix={<LockOutlined />} 
                                            value={confirmPassword} 
                                            onChange={e => setConfirmPassword(e.target.value)} 
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="default" onClick={handleCancelChangePassword}>Cancel</Button>
                                        <Button type="primary" htmlType="submit" disabled={!newPassword || !currentPassword || newPassword !== confirmPassword} className='float-right'>
                                            Save Changes
                                        </Button>
                                    </Form.Item>
                                </>
                            ) : (
                                <Form.Item>
                                    <Button type="default" onClick={() => setShowChangePassword(true)}>Change Password</Button>
                                    <Button type="primary" htmlType="submit" disabled={!isProfileChanged()} className='float-right'>
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            )}
                        </Form>
                    </div>
                )}

                {view === 'orderHistory' && (
                    <div className="bg-white rounded-lg shadow-md p-8 transition-all border-t-4 space-y-6 w-full md:w-1/3 mx-auto">
                        {loading ? (
                            <Spin />
                        ) : noOrders ? (
                            <div>No orders found.</div>
                        ) : (
                            currentOrders.map(order => (
                                <div 
                                    key={order.orderId} 
                                    onClick={() => openOrderModal(order)} // Open modal on click
                                    className="border-b border-gray-200 py-2 cursor-pointer"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">Total: ${order.totalAmount}</span>
                                    </div>
                                    <p className="text-sm">Order Date: {new Date(order.orderDate).toLocaleDateString("EN-US")}</p>
                                    <span className="text-gray-600">Status: {order.status}</span>
                                </div>
                            ))
                        )}
                        <Pagination
                            current={currentPage}
                            onChange={page => setCurrentPage(page)}
                            total={orders.length}
                            pageSize={ordersPerPage}
                        />
                    </div>
                )}
            </div>
            <Footer />
            <Modal
                title="Order Details"
                visible={!!selectedOrder}
                onCancel={closeOrderModal}
                footer={null}
            >
                {selectedOrder && (
                    <div>
                        <h2 className="text-xl font-bold">Order ID: {selectedOrder.orderId}</h2>
                        <p>Date: {new Date(selectedOrder.orderDate).toLocaleDateString("EN-US")}</p>
                        <p>Total: ${selectedOrder.totalAmount}</p>
                        <p>Status: {selectedOrder.status}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Profilepage;
