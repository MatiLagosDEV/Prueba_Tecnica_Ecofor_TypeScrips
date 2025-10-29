
import axios from "axios";

export interface Cat {
  id: number;
  name: string;
  origen: string;
  temperamento: string;
  descripcion: string;
  url: string;
}

const API_URL = "http://localhost:8000/api/api/thecatapi.com/v1/breeds/";

export const getCats = () => axios.get<Cat[]>(API_URL);

export const getCat = (id: number) => axios.get<Cat>(`${API_URL}${id}`);

export const createCat = (cat: Cat) => axios.post<Cat>(API_URL, cat);

export const updateCat = (id: number, cat: Cat) => axios.put<Cat>(`${API_URL}${id}`, cat);

export const deleteCat = (id: number) => axios.delete(`${API_URL}${id}`);