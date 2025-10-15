import axios from "axios";

export interface Favorite {
    id: number;
    cat: number;
    cat_detalles: {
        id: number;
        name: string;
        origin: string;
        temperamento: string;
        esperanza_vida: string;
        descripcion_completa: string;
    };
}

const API_URL = "http://localhost:8000/api/api/thecatapi.com/v1/favoriteCats/";

export const getFavorites = () => axios.get<Favorite[]>(API_URL);

export const getFavorite = (id: number) => axios.get<Favorite>(`${API_URL}${id}`);

export const createFavorite = (catId: number) => axios.post<Favorite>(API_URL, { cat: catId });

export const updateFavorite = (id: number, favorite: Favorite) => axios.put<Favorite>(`${API_URL}${id}/`, favorite);

export const deleteFavorite = (id: number) => axios.delete(`${API_URL}${id}/`);