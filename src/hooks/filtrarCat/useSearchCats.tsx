import { useState } from 'react';
import { searchCats, SearchFilters } from '../../services/filtroServices';
import { Cat } from '../../services/CatServices';

export function useSearchCats() {
    const [cats, setCats] = useState<Cat[]>([]);
    
    const search = async (filters: SearchFilters) => {
        const response = await searchCats(filters);
        setCats(response.data);
    };

    return { cats, search };
}