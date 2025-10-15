import React, { useState } from 'react';
import { Favorite } from '../services/FavoriteServices';

interface FavoriteItemProps {
    favorite: Favorite;
    onDelete: (favoriteId: number) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ favorite, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const getCatImage = (catName: string) => {
        const catImages: { [key: string]: string } = {
            'Maine Coon': 'https://petscare-assets-prod.s3.amazonaws.com/media/original_images/maine-coon-cat-tree-branch-sunlit-84736.webp',
            'Persa': 'https://nupec.com/wp-content/uploads/2022/06/portrait-of-a-gray-persian-cat-2021-08-29-08-46-19-utc.jpg',
            'American': 'https://www.thesprucepets.com/thmb/qY8lDkwrmu2iKf56apl8G6mDZ-c=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/american-bobtail-cat-breed-9f32da27133647db92f4decc93a71e6d.jpg'
        };

        return catImages[catName] || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop';
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={getCatImage(favorite.cat_detalles.name)}
                    alt={favorite.cat_detalles.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop';
                    }}
                />
            </div>
            
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">{favorite.cat_detalles.name}</h3>
                
                <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600">Origen:</span> {favorite.cat_detalles.origin}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-purple-600">Temperamento:</span> {favorite.cat_detalles.temperamento}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-green-600">Esperanza de vida:</span> {favorite.cat_detalles.esperanza_vida}
                    </p>
                </div>
                
                <div className="mb-4">
                    <p className={`text-gray-700 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {favorite.cat_detalles.descripcion_completa}
                    </p>
                    {favorite.cat_detalles.descripcion_completa.length > 150 && (
                        <button
                            onClick={toggleExpanded}
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1 focus:outline-none"
                        >
                            {isExpanded ? 'Ver menos' : 'Ver más'}
                        </button>
                    )}
                </div>
                
                <button 
                    onClick={() => onDelete(favorite.id)}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    Quitar de Favoritos
                </button>
            </div>
        </div>
    );
};

export default FavoriteItem;
