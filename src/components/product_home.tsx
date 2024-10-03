import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  gender: string;
  isNew: boolean;
  discountPrice: number;
  startDate: string;
  endDate: string;
  category: Category;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchProducts = async () => {
          const payload = {
              Gender: "Male"
          }
      try {
        const response = await axios.get<Product[]>('http://localhost:5099/api/Products',payload);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className='w-full'>
      <div className='max-w-[1440px] mx-auto'>
        <h1 className='text-center text-2xl font-bold mb-4'>Classics Spotlight</h1>
        <Slider {...settings}>
          {products.slice(0, 10).map((product) => (
            <div key={product.id} className='p-2'>
              <img src={product.imageUrl} alt={product.name} className='w-full object-contain' />
              <h2 className='text-center mt-2'>{product.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;
