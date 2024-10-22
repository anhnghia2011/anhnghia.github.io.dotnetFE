import { useEffect, useState } from 'react';
import Footer from './Footer';
import NavHeader from './NavHeader';
import axios from 'axios';

interface Order {
    id: number;
    orderDate: string;
    totalprice: number;
    status: string;
}

function Profilepage() {
    const [order, setOrder] = useState<Order[]>([]);
    const [view, setView] = useState<'profile' | 'orderHistory'>('profile'); // Manage view state

    // Fetch order history when component mounts
    useEffect(() => {
        axios.get('http://localhost:5099/api/Order')
            .then(response => {
                setOrder(response.data);
                console.log("Order data:", response.data);
            })
            .catch(error => {
                console.error("Error fetching order data:", error);
            });
    }, []);
    interface UserInfo {
        firstName: string;
        lastName: string;
        email: string;
    }

    const [info, setInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        if (userData && userData.lastName) {
            setInfo(userData);
        }
    }, []);

    const showProfile = () => setView('profile');
    const showOrderHistory = () => setView('orderHistory');

    return (
        <div className="shop">
            <NavHeader />
            <div className="py-20 px-44">
                <div className="flex space-x-4 mb-8">
                    <button onClick={showProfile} className="text-4xl font-bold">
                        Profile
                    </button>
                    <button onClick={showOrderHistory} className="text-4xl font-bold">
                        Order History
                    </button>
                </div>

                {view === 'profile' && (
                    <div>
                        {info && (
                            <div className="flex justify-between items-center border-b-2 border-gray-200 py-4">
                                <p className="text-lg font-semibold">First Name: {info.firstName}</p>
                                <p className="text-sm">Last Name: {info.lastName}</p>
                                <p className="text-sm">Email: {info.email}</p>
                            </div>
                        )}
                    </div>
                )}

                {view === 'orderHistory' && (
                    <div>
                          {order.map((order: Order) => (
                            <div key={order.id} className="flex justify-between items-center border-b-2 border-gray-200 py-4">
                              <div>
                               <p className="text-lg font-semibold">Order ID: {order.id}</p>
                               <p className="text-sm">Order Date: {order.orderDate}</p>
                             </div>
                           <div>
                               <p className="text-lg font-semibold">Total: ${order.totalprice}</p>
                               <p className="text-sm">Status: {order.status}</p>
                           </div>
                    </div>
                ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Profilepage;
