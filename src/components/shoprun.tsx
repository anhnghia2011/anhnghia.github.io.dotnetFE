import { useState, useEffect } from 'react';
import axios from 'axios';

function Shoprun () {
    interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        discountPrice?: number;
        isNew?: boolean;
        imageUrl: string;
    }

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5099/api/Products/category/1')
            .then(response => {
                setProducts(response.data); 
              
            })
            .catch(function (error) {
                console.log(error);
                });
    }, []);

    return (
        <div className="product-list grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
                <div key={product.id} className="product-card border rounded-lg shadow-md p-4">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-48 object-cover mb-4" 
                    />
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="text-lg font-semibold mt-2">${product.price}</p>
                    {product.discountPrice && (
                        <p className="text-red-500">Discount: ${product.discountPrice}</p>
                    )}
                    {product.isNew && <span className="text-green-500">New Arrival</span>}
                </div>
            ))}
        </div>
    );
};

export default Shoprun;
