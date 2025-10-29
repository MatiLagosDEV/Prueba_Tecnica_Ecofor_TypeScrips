import { useState } from 'react';
import { getFavorites, FavoriteCat } from '../../services/FavoriteServices';

export function useGetFavorites() {
    const [favorites, setFavorites] = useState<FavoriteCat[]>([]);
    const fetchFavorites = async () => {
        const response = await getFavorites();
        setFavorites(response.data);
    };

    return { favorites, fetchFavorites };

}