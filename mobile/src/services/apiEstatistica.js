import axios from 'axios';
export const animalId = "68194120636f719fcd5ee5fd";


const apiEstatisticas = axios.create({
    baseURL: 'https://api-petdex-estatistica.onrender.com',
    timeout: 20000,
});

export async function getMediaUltimos5Dias() {
    try {
        const response = await apiEstatisticas.get('/batimentos/media-ultimos-5-dias');
        const medias = response.data.medias;

        if (!medias) {
            console.warn('[API] medias não encontradas na resposta');
            return { content: [] };
        }

        const content = Object.entries(medias).map(([data, frequenciaMedia]) => ({
            data,
            frequenciaMedia
        }));

        return { content };
    } catch (error) {
        console.error('[API] Erro ao buscar médias dos últimos 5 dias:', error.message);
        return { content: [] };
    }
}

// 2. Estatísticas gerais
export async function getEstatisticasGerais() {
    try {
        const response = await apiEstatisticas.get('/batimentos/estatisticas');
        return {
            media: response.data.media || 0,
            mediana: response.data.mediana || 0,
            moda: response.data.moda || 0,
            desvioPadrao: response.data.desvio_padrao || 0,
            assimetria: response.data.assimetria || 0
        };
    } catch (error) {
        console.error('[API] Erro ao buscar estatísticas:', error.message);
        return null;
    }
}

// 3. Média por período (usado para buscar média de uma data específica)
export async function getMediaPorPeriodo(inicio, fim) {
    try {
        const response = await apiEstatisticas.get('/batimentos/media-por-data', {
            params: { inicio, fim }
        });
        return response.data;
    } catch (error) {
        console.error('[API] Erro ao buscar média por período:', error.message);
        return { media: null };
    }
}

// 4. Probabilidade de um valor de batimento
export async function getProbabilidadeValor(valor) {
    try {
        const response = await apiEstatisticas.get(`/batimentos/probabilidade?valor=${valor}`);
        return response.data;
    } catch (error) {
        console.error('[API] Erro ao calcular probabilidade:', error.message);
        return null;
    }
}

export async function getMediaUltimas5Horas() {
    try {
        const response = await apiEstatisticas.get('/batimentos/media-ultimas-5-horas-registradas');
        return response.data;
    } catch (error) {
        console.error('[API] Erro ao buscar média últimas 5 horas:', error.message);
        return null;
    }
}