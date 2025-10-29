import { createFavorite, getFavorites } from "../../services/FavoriteServices";

export function useCreateFavorite() {
    const create = async (catId: string) => {
        try {
            const favoritesResponse = await getFavorites();
            const existingFavorite = favoritesResponse.data.find(fav => String(fav.id) === catId);

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