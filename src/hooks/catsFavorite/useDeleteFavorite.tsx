import { deleteFavorite } from "../../services/FavoriteServices";

export function useDeleteFavorite() {
    const remove = async (id: number) => {
        await deleteFavorite(id);
        return true;
    };

    return { remove };

}