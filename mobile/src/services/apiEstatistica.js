import axios from 'axios';
export const animalId = "68194120636f719fcd5ee5fd";

const apiEstatistica = axios.create({
    baseURL: 'https://api-petdex-estatistica.onrender.com',
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

        if (!response.data.media_por_hora) {
            console.warn('[API] A propriedade media_por_hora não foi encontrada na resposta');
            return { media: 0, dados: [] };
        }

        const dadosArray = Object.entries(response.data.media_por_hora)
            .map(([dataHora, valor]) => {
                const hora = new Date(dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return { hora, valor };
            })
            .sort((a, b) => a.hora.localeCompare(b.hora));

        return {
            media: response.data.media,
            dados: dadosArray
        };
    } catch (error) {
        console.error('Erro ao buscar médias das últimas 5 horas:', error);
        return { media: 0, dados: [] };
    }
}