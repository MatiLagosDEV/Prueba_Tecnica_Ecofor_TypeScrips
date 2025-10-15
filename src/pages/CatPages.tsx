import React, { useEffect, useState, useMemo } from 'react';
import { useGetCats } from '../hooks/cats/useGetCats';
import { useCreateFavorite } from '../hooks/catsFavorite/useCreateFavorite';

interface CatPagesProps {
    searchTerm: string;
    originFilter: string;
    temperamentoFilter: string;
}

const CatPages: React.FC<CatPagesProps> = ({ searchTerm, originFilter, temperamentoFilter }) => {
    const { cats, fetchCats } = useGetCats();
    const { create } = useCreateFavorite();
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetchCats();
    }, []);

    const filteredCats = useMemo(() => {
        return cats.filter(cat => {

            const matchesName = !searchTerm.trim() || 
                cat.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesOrigin = !originFilter || 
                cat.origin.toLowerCase().includes(originFilter.toLowerCase());
            
            const matchesTemperamento = !temperamentoFilter || 
                cat.temperamento.toLowerCase().includes(temperamentoFilter.toLowerCase());
            
            return matchesName && matchesOrigin && matchesTemperamento;
        });
    }, [cats, searchTerm, originFilter, temperamentoFilter]);

    const toggleExpanded = (catId: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(catId)) {
            newExpanded.delete(catId);
        } else {
            newExpanded.add(catId);
        }
        setExpandedCards(newExpanded);
    };


    const getCatImage = (catName: string) => {
        const catImages: { [key: string]: string } = {
            'Maine Coon': 'https://petscare-assets-prod.s3.amazonaws.com/media/original_images/maine-coon-cat-tree-branch-sunlit-84736.webp',
            'Persa': 'https://nupec.com/wp-content/uploads/2022/06/portrait-of-a-gray-persian-cat-2021-08-29-08-46-19-utc.jpg',
            'American': 'https://www.thesprucepets.com/thmb/qY8lDkwrmu2iKf56apl8G6mDZ-c=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/american-bobtail-cat-breed-9f32da27133647db92f4decc93a71e6d.jpg'

        };

        return catImages[catName] || `https://api.thecatapi.com/v1/images/search?breed_ids=${catName.toLowerCase().replace(/\s+/g, '')}&limit=1`;
    };

    const handleAddToFavorites = async (catId: number) => {
        try {
            await create(catId);
            alert('¡Gato agregado a favoritos exitosamente!');
        } catch (error: any) {
            console.error('Error al agregar a favoritos:', error);
            if (error.message && error.message.includes('ya está en tus favoritos')) {
                alert('Este gato ya está en tus favoritos');
            } else {
                alert('Error al agregar a favoritos: ' + (error.message || 'Error desconocido'));
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cat Breeds Explorer</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCats.map(cat => (
                    <div key={cat.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        {}
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={getCatImage(cat.name)}
                                alt={cat.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop';
                                }}
                            />
                        </div>
                        
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">{cat.name}</h3>
                            
                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-blue-600">Origen:</span> {cat.origin}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-purple-600">Temperamento:</span> {cat.temperamento}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-green-600">Esperanza de vida:</span> {cat.esperanza_vida}
                                </p>
                            </div>
                            
                            <div className="mb-4">
                                <p className={`text-gray-700 text-sm leading-relaxed ${expandedCards.has(cat.id) ? '' : 'line-clamp-3'}`}>
                                    {cat.descripcion_completa}
                                </p>
                                {cat.descripcion_completa.length > 150 && (
                                    <button
                                        onClick={() => toggleExpanded(cat.id)}
                                        className="text-blue-600 hover:text-blue-800 text-xs font-medium mt-1 focus:outline-none"
                                    >
                                        {expandedCards.has(cat.id) ? 'Ver menos' : 'Ver más'}
                                    </button>
                                )}
                            </div>
                            
                            <button 
                                onClick={() => handleAddToFavorites(cat.id)}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
                            >
                                Agregar a Favoritos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatPages;