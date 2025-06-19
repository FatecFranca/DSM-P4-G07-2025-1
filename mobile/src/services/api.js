import axios from "axios";
export const animalId = "68194120636f719fcd5ee5fd";

const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 20000,
});

// Função para pegar info do animal pelo id
export async function getAnimalInfo(animalId) {
    try {
        const response = await api.get(`/animais/${animalId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar info do animal:', error);
        throw error;
    }
}
export async function getLatestBatimentos(animalId) {
    try {
        const response = await api.get(`/batimentos/animal/${animalId}`)
        console.log("[DEBUG] Dados de batimentos:", response.data)
        return response.data?.content[0].frequenciaMedia
    } catch (error) {
        console.error('[API] Erro ao buscar batimentos:', error)
        throw error
    }
}
export async function getLatestLocalizacao(animalId) {
    try {
        const response = await api.get(`/localizacoes/animal/${animalId}`)
        console.log("[DEBUG] Dados de localizacoes:", response.data)
        return response.data?.content[0]
    } catch (error) {
        console.error('[API] Erro ao buscar localizacoes:', error)
        throw error
    }
}
