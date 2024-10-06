import axios from 'axios';
import { useState } from 'react';

function Shophome() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Function to fetch products based on categoryId
    const fetchProductsByCategory = (categoryId) => {
        setLoading(true);
        axios.get(`http://localhost:5099/api/Products/category/${categoryId}`)
            .then((response) => {
                setProducts(response.data); // Assuming the response contains the products
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    };

    // Handle category button click
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        fetchProductsByCategory(categoryId);
    };

    return (
        <div className='w-full'>
            <div className='max-w-[1440px] mx-auto'>
                <h1 className='text-start text-2xl font-bold my-5 pl-5'>Shop</h1>

                <div className='overflow-x-scroll whitespace-nowrap mt-5'>
                    {/* Category 1: Running */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/a3c971bc-bc0a-4c0c-8bdf-e807a3027e53/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            onClick={() => handleCategoryClick(1)} 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Running
                        </button>
                    </div>

                    {/* Category 2: Soccer */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/e4695209-3f23-4a05-a9f9-d0edde31b653/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            onClick={() => handleCategoryClick(2)} 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Soccer
                        </button>
                    </div>

                    {/* Category 3: Basketball */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/38ed4b8e-9cfc-4e66-9ddd-02a52314eed9/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            onClick={() => handleCategoryClick(3)} 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Basketball
                        </button>
                    </div>

                    {/* Category 4: Gym */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/e36a4a2b-4d3f-4d1c-bc75-d6057b7cec87/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            onClick={() => handleCategoryClick(4)} 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Gym
                        </button>
                    </div>

                    {/* Category 5: Dance */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/c779e4f6-7d91-46c3-9282-39155e0819e5/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            onClick={() => handleCategoryClick(5)} 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Dance
                        </button>
                    </div>

                    {/* Category 6: Yoga */}
                    <div className='inline-block w-500 h-300 relative mx-3' 
                        style={{
                            backgroundImage: `url("https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_599,c_limit/6be55ac6-0243-42d6-87d0-a650074c658c/nike-just-do-it.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <button 
                            onClick={() => handleCategoryClick(6)} 
                            className='absolute left-3 bottom-3 p-2 rounded-2xl text-black bg-white'>
                            Yoga
                        </button>
                    </div>
                </div>

                <div className='mt-5'>
                    <h2 className='text-xl font-bold pl-5'>Products</h2>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {products.map((product) => (
                                <div key={product.id} className='border p-4'>
                                    <h3 className='text-lg font-bold'>{product.name}</h3>
                                    <img src={product.imageUrl} alt={product.name} />
                                    <p>{product.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shophome;
