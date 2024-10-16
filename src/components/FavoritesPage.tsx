import { useState, useEffect } from 'react';
import NavHeader from './NavHeader';
import Footer from './Footer';

interface Product {
    id: string | number;
    name: string;
    imageUrl: string;
    price: number;
}

function FavoritesPage() {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }, []);

    const removeFavorite = (productId: string | number) => {
        const updatedFavorites = favorites.filter(item => item.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
        <NavHeader />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {favorites.map((product) => (
                        <div key={product.id} className="border p-4 rounded-md">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            <button 
                                onClick={() => removeFavorite(product.id)}
                                className="text-red-500 mt-2"
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no favorite items.</p>
            )}
            </div>
            <Footer />
        </div>
    );
}

export default FavoritesPage;
