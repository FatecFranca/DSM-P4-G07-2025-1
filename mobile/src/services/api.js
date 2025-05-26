import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dsm-p4-g07-2025-7.onrender.com',
    timeout: 15000,
});

export async function getAnimalInfo(animalId) {
    try {
        const response = await api.get(`/animais/${animalId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar info do animal:', error);
        throw error;
    }
}
