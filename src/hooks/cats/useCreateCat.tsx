import { createCat, Cat} from "../../services/CatServices";

export function useCreateCat() {
    const create = async (data: Partial<Cat>) => {
        const response = await createCat(data as Cat);
        return response.data;
};

    return { create };

}