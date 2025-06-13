import axiosInstance from "@/axiosInstance";
import {type Type} from "@/domain/StoreType";

export const TypeService = {
    async getTypes() {
        const response = await axiosInstance.get<Type[]>('types')

        return response.data;
    }
}