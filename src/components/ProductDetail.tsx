import { Alert, message, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import NavHeader from './NavHeader';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    isNew?: boolean;
    gender: string;
}

function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState<number | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5099/api/Products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error); // Log the error
                setError('Unable to retrieve product information.');
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleQuantityChange = (action: string) => {
        if (action === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleSizeSelection = (selectedSize: number) => {
        setSize(selectedSize);
    };

    const availableSizes = () => {
        if (product?.gender === 'Male') {
            return [40, 41, 42, 43, 44, 45];
        } else if (product?.gender === 'Female') {
            return [35, 36, 37, 38, 39, 40];
        } else {
            return [10, 11, 12, 13, 14, 15]; 
        }
    };

    const handleBuyClick = async () => {
        if (!size) {
            message.error('Please select a size.');
            return;
        }
    
        if (!product) {
            message.error('Product information is not available.');
            return;
        }
    
        const orderInfo = {
            productId: product.id,
            productName: product.name,
            ProductImage: product.imageUrl,
            quantity,
            size,
            price: product.discountPrice || product.price,
            description: product.description,
        };
        try {
            await axios.post('http://localhost:5099/api/Cart/add', orderInfo.price && orderInfo );
            message.success('Product has been added to the cart.');
        } catch (error) {
            console.error('Error placing order:', error);
            message.error('Unable to add product to the cart.');
        }
    };

    if (loading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message={error} type="error" />;
    }

    if (!product) {
        return <Alert message="Product not found." type="error" />;
    }

    return (
        <div className='shop'>
            <NavHeader />
            <div className="py-10 px-44 flex gap-10">
                <div className="flex-shrink-0">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-96 h-96 object-cover rounded-lg"
                    />
                </div>

                <div className="flex flex-col gap-5">
                    {product.isNew && (
                        <span className="absolute top-30 left-44 bg-green-200 text-green-700 px-2 py-1 text-xs font-semibold rounded-br-lg">
                            New Arrival
                        </span>
                    )}
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p>{product.description}</p>
                    
                    <div className="flex items-center gap-3">
                        {product.discountPrice ? (
                            <>
                                <span className="line-through text-gray-500">${product.price.toFixed(2)}</span>
                                <span className="text-red-500 text-2xl">${product.discountPrice.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="text-2xl">${product.price.toFixed(2)}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange('decrease')} className="px-2 py-1 bg-gray-200 rounded">
                            -
                        </button>
                        <span className="px-4">{quantity}</span>
                        <button onClick={() => handleQuantityChange('increase')} className="px-2 py-1 bg-gray-200 rounded">
                            +
                        </button>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold mb-2">Select Size</h4>
                        <div className="flex gap-3">
                            {availableSizes().map(sizeOption => (
                                <button
                                    key={sizeOption}
                                    onClick={() => handleSizeSelection(sizeOption)}
                                    className={`px-3 py-2 border rounded ${size === sizeOption ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
                                >
                                    {sizeOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleBuyClick}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;
