import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams(); // Lấy ID từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5099/api/Products/${id}`);
                setProduct(response.data.data);
            } catch (err) {
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <img src={product?.imageUrl} alt={product?.name} />
            <p>Price: ${product?.price}</p>
            {/* Hiển thị thêm thông tin sản phẩm */}
        </div>
    );
}

export default ProductDetail;
