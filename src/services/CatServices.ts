import axios from "axios";

export interface Cat {
  id: number;
  name: string;
  origin: string;
  temperamento: string;
  esperanza_vida: string;
  descripcion_completa: string;
}

const API_URL = "http://localhost:8000/api/api/thecatapi.com/v1/cats/";

export const getCats = () => axios.get<Cat[]>(API_URL);

export const getCat = (id: number) => axios.get<Cat>(`${API_URL}${id}`);

export const createCat = (cat: Cat) => axios.post<Cat>(API_URL, cat);

export const updateCat = (id: number, cat: Cat) => axios.put<Cat>(`${API_URL}${id}`, cat);

export const deleteCat = (id: number) => axios.delete(`${API_URL}${id}`);