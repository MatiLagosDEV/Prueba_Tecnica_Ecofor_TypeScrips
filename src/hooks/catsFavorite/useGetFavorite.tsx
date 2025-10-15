import { useState } from 'react';
import { getFavorites, Favorite } from '../../services/FavoriteServices';

export function useGetFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const fetchFavorites = async () => {
        const response = await getFavorites();
        setFavorites(response.data);
    };

    return { favorites, fetchFavorites };

}