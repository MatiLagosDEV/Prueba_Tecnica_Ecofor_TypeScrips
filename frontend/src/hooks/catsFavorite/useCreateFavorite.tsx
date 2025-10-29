import { createFavorite, getFavorites } from "../../services/FavoriteServices";

export function useCreateFavorite() {
    const create = async (catId: number) => {
        try {
            const favoritesResponse = await getFavorites();
            const existingFavorite = favoritesResponse.data.find(fav => fav.id === catId);

            if (existingFavorite) {
                throw new Error(`El gato ya está en tus favoritos`);
            }

            const response = await createFavorite(catId);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    };
    return { create };
}