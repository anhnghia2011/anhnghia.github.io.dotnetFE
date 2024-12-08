import axios from 'axios';
import { useEffect, useState } from 'react';

const OrderManagement = () => {
  interface Order {
    id: number;
    customerId: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    email: string;
  }

  interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, customersResponse] = await Promise.all([
          axios.get('http://localhost:5099/api/Order'),
          axios.get('http://localhost:5099/api/Customers/all'),
        ]);

        setOrders(ordersResponse.data);
        setCustomers(customersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCustomerName = (customerId: number) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
  };
  const getCustomeremail = (customerId: number) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? `${customer.email}` : 'Unknown Customer';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Order Management</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Order #{order.id}</h2>
              <span className={`px-2 py-1 text-sm rounded-full ${order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                {order.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm">Customer: {getCustomerName(order.customerId)}</p>
            <p className="text-gray-500 text-sm">Email: {getCustomeremail(order.customerId)}</p>
            <p className="text-gray-500 text-sm">Date: {new Date(order.orderDate).toLocaleString()}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">${order.totalAmount.toFixed(2)}</span>
              <span className="text-sm text-gray-600">Total</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
