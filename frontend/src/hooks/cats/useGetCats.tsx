import { useState } from 'react';
import { getCats, Cat} from "../../services/CatServices";

export function useGetCats() {
    const [cats, setCats] = useState<Cat[]>([]);
    const fetchCats = async () => {
        const response = await getCats();
        setCats(response.data);
    };

    return { cats, fetchCats };

}


