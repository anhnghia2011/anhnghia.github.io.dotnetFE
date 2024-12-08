import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductManagement = () => {
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryName: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5099/api/Products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Quản lý sản phẩm</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-56 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
              <p className="text-gray-500 mt-2 text-sm">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">{product.price} $</span>
                <span className="text-sm text-gray-600">{product.categoryName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
