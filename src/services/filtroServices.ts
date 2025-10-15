import axios from "axios";
import { Cat } from "./CatServices";

export interface SearchFilters {
    name?: string;
    origin?: string;
    temperamento?: string;
}

const API_URL = "http://localhost:8000/api/api/thecatapi.com/v1/search-cats/";

export const searchCats = (filters: SearchFilters) => {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.origin) params.append('origin', filters.origin);
    if (filters.temperamento) params.append('temperamento', filters.temperamento);
    
    const queryString = params.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;
    
    return axios.get<Cat[]>(url);
};