import axios from "axios";

export interface FavoriteCat {
    id: number;
    breed_id: string | null;
    name: string | null;
    origen: string | null;
    temperamento: string | null;
    descripcion: string | null;
    url: string | null;
}

const FAVORITE_LIST_URL = "http://localhost:8000/api/api/thecatapi.com/v1/FavoriteCats/";
const FAVORITE_CREATE_URL = "http://localhost:8000/api/api/thecatapi.com/v1/favorite/";

export const getFavorites = () => axios.get<FavoriteCat[]>(FAVORITE_LIST_URL);

export const getFavorite = (id: number) => axios.get<FavoriteCat>(`${FAVORITE_LIST_URL}${id}`);

export const createFavorite = (id: string) => axios.post<FavoriteCat>(FAVORITE_CREATE_URL, { id });

export const updateFavorite = (id: number, favorite: Partial<FavoriteCat>) => axios.put<FavoriteCat>(`${FAVORITE_LIST_URL}${id}/`, favorite);

export const deleteFavorite = (id: number) => axios.delete(`${FAVORITE_LIST_URL}${id}/`);