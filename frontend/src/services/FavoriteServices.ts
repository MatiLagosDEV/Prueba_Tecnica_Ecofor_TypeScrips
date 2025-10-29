import axios from "axios";

export interface FavoriteCat {
    id: number;
    breed_id: string;
    name: string;
    origen: string;
    temperamento: string;
    descripcion: string;
    url: string;
}

const FAVORITE_LIST_URL = "http://localhost:8000/api/api/thecatapi.com/v1/FavoriteCats/";
const FAVORITE_CREATE_URL = "http://localhost:8000/api/api/thecatapi.com/v1/favorite/";
const AUTH_TOKEN = process.env.REACT_APP_JWT_TOKEN;

export const createFavorite = (id: number) => axios.post<FavoriteCat>(FAVORITE_CREATE_URL, { id }, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const getFavorite = (id: number) => axios.get<FavoriteCat>(`${FAVORITE_LIST_URL}${id}`, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const getFavorites = () => axios.get<FavoriteCat[]>(FAVORITE_LIST_URL, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const updateFavorite = (id: number, favorite: Partial<FavoriteCat>) => axios.put<FavoriteCat>(`${FAVORITE_LIST_URL}${id}/`, favorite, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const deleteFavorite = (id: number) => axios.delete(`${FAVORITE_LIST_URL}${id}/`, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});