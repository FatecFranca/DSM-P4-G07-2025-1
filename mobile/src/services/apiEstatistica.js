import axios from 'axios';
export const animalId = "68194120636f719fcd5ee5fd";

const apiEstatistica = axios.create({
    baseURL: process.env.API_ESTATISTICA_URL,
    timeout: 20000,
});

export async function getMediaUltimos5Dias() {
    try {
        const response = await apiEstatistica.get('/batimentos/media-ultimos-5-dias');
        const mediasArray = Object.entries(response.data.medias || {}).map(([data, valor]) => ({
            data,
            valor
        }));
        return mediasArray;
    } catch (error) {
        console.error('Erro ao buscar médias dos últimos 5 dias:', error);
        return [];
    }
}

export async function getEstatisticasCompletas() {
    try {
        const response = await apiEstatistica.get('/batimentos/estatisticas');
        if (!response.data) return null;

        return {
            media: response.data.media ?? 0,
            mediana: response.data.mediana ?? 0,
            moda: response.data.moda ?? 0,
            desvioPadrao: response.data.desvio_padrao ?? 0,
            assimetria: response.data.assimetria ?? 0,
            curtose: response.data.curtose ?? 0,
        };
    } catch (error) {
        console.error('Erro ao buscar estatísticas completas:', error);
        return null;
    }
}

export async function getMediaPorData(data) {
    try {
        const response = await apiEstatistica.get('/batimentos/media-por-data', {
            params: { inicio: data, fim: data }
        });
        return typeof response.data.media === 'number' ? response.data.media : null;
    } catch (error) {
        console.error('Erro ao buscar média por data:', error);
        return null;
    }
}

export async function getProbabilidadePorValor(valor) {
    try {
        const response = await apiEstatistica.get(`/batimentos/probabilidade?valor=${valor}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar probabilidade por valor:', error);
        return null;
    }
}

export async function getMediaUltimas5Horas() {
    try {
        const response = await apiEstatistica.get('/batimentos/media-ultimas-5-horas-registradas');
        console.log('[DEBUG] Dados de médias das últimas 5 horas:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar médias das últimas 5 horas:', error);
        return { media_por_hora: {}, media: 0 };
    }
}


export async function getRegressao() {
    try {
        const response = await apiEstatistica.get('/batimentos/regressao');
        console.log("[DEBUG] Dados de regressão:", response.data);
        return response.data;
    } catch (error) {
        console.error('[API] Erro ao buscar dados de regressão:', error);
        throw error;
    }
}

export async function getPredicaoBatimento(acelerometroX = 0, acelerometroY = 0, acelerometroZ = 0) {
    try {
        const params = new URLSearchParams({ acelerometroX, acelerometroY, acelerometroZ });
        const response = await apiEstatistica.get(`/batimentos/predizer?${params.toString()}`);
        console.log("[DEBUG] Dados de predição:", response.data);
        return response.data;
    } catch (error) {
        console.error('[API] Erro ao buscar predição de batimento:', error);
        throw error;
    }
}