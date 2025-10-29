
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
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY0MzY4Mjc5LCJpYXQiOjE3NjE3NzYyNzksImp0aSI6IjcxOTEyNDRkYWExNTQ2ODZiNTY4ZTdiNjdjNDVhMzczIiwidXNlcl9pZCI6IjEifQ.xEy1J3v3zXYLAtqdZQYYuXU35rkKpXiM0EfXEXFVhWo";

export const getCats = () => axios.get<Cat[]>(API_URL, {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const getCat = (id: number) => axios.get<Cat>(`${API_URL}${id}`, {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const createCat = (cat: Cat) => axios.post<Cat>(API_URL, cat, {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const updateCat = (id: number, cat: Cat) => axios.put<Cat>(`${API_URL}${id}`, cat, {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});

export const deleteCat = (id: number) => axios.delete(`${API_URL}${id}`, {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
});