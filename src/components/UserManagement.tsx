import axios from 'axios';
import { useEffect, useState } from 'react';

const UserManagement = () => {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    isActive: boolean;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5099/api/Customers/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number, email: string) => {
    if (email === "admin@gmail.com") {
      alert("Không thể xóa tài khoản admin!");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:5099/api/Customers/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("Xóa người dùng thành công");
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      alert("Không thể xóa người dùng");
    }
  };
  

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Quản lý người dùng</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white border rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
              <span className={`px-2 py-1 text-sm rounded-full ${user.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-gray-500 text-sm">Email: {user.email}</p>
            <p className="text-gray-500 text-sm">Phone: {user.phoneNumber}</p>
            <p className="text-gray-400 text-xs mt-2">Created at: {new Date(user.createdAt).toLocaleString()}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={() => handleDelete(user.id, user.email)} 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
