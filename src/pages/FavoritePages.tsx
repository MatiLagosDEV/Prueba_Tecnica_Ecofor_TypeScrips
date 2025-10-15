import React, { useEffect, useMemo } from 'react';
import { useGetFavorites } from '../hooks/catsFavorite/useGetFavorite';
import { useDeleteFavorite } from '../hooks/catsFavorite/useDeleteFavorite';
import FavoriteItem from '../components/FavoriteItem';

interface FavoritePagesProps {
    searchTerm: string;
}

const FavoritePages: React.FC<FavoritePagesProps> = ({ searchTerm }) => {
    const { favorites, fetchFavorites } = useGetFavorites();
    const { remove } = useDeleteFavorite();

    useEffect(() => {
        fetchFavorites();
    }, []);

    // Filtrar favoritos basado en el término de búsqueda
    const filteredFavorites = useMemo(() => {
        if (!searchTerm.trim()) {
            return favorites;
        }
        return favorites.filter(favorite => 
            favorite.cat_detalles.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [favorites, searchTerm]);

    const handleDelete = async (favoriteId: number) => {
        try {
            await remove(favoriteId);
            fetchFavorites();
        } catch (error) {
            console.error('Error al eliminar favorito:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Mis Gatos Favoritos</h1>
            
            {favorites.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4"></div>
                    <p className="text-xl text-gray-600 mb-2">No tienes gatos favoritos aún</p>
                    <p className="text-gray-500">¡Explora la lista de gatos y agrega algunos a tus favoritos!</p>
                </div>
            ) : filteredFavorites.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-xl text-gray-600 mb-2">
                        No se encontraron gatos favoritos con "{searchTerm}"
                    </p>
                    <p className="text-gray-500">Intenta con otro término de búsqueda</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFavorites.map(favorite => (
                        <FavoriteItem
                            key={favorite.id}
                            favorite={favorite}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritePages;