import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../style.css";

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


  useEffect(() => {
      const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:5099/api/Products/spotlight');
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className='w-full'>
      <div className='max-w-[1440px] mx-auto'>
        <h1 className='text-start text-4xl font-bold mt-10 pl-5'>Classics Spotlight</h1>
        <div className='spotlight'>
        <Slider {...settings}>
          {products.slice(0, 10).map((product) => (
            <div key={product.id} className='p-2'>
              <img src={product.imageUrl} alt={product.name} className='w-full object-contain' />
            </div>
          ))}
        </Slider>
          </div>
      </div>
    </div>
  );
};

export default ProductList;
