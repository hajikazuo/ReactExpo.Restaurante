import api from "./api";
import { Prato } from '../models/prato';

export const fetchPratos = async (): Promise<Prato[]> => {
    try {
        const response = await api.get<Prato[]>('/api/pratos');
        return response.data;
    } catch (error) {
        throw error;
    }
};
