import axios from "axios"

export const animalId = "68194120636f719fcd5ee5fd";

// Configuração para a API principal
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Configuração para a API de estatísticas
const apiEstatistica = axios.create({
  baseURL: '/api-estatistica',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Funções para a API principal
export async function getAnimalInfo(animalId) {
  try {
    console.log(`[API] Buscando animal ID: ${animalId}`)
    const response = await api.get(`/animais/${animalId}`)
    return response.data
  } catch (error) {
    const errorInfo = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    }
    console.error('[API] Erro detalhado:', errorInfo)
    throw error
  }
}

export async function getLatestBatimentos(animalId) {
  try {
    const response = await api.get(`/batimentos/animal/${animalId}`)
    console.log("[DEBUG] Dados de batimentos:", response.data)
    return response.data?.content[0]?.frequenciaMedia || "--"
  } catch (error) {
    console.error('[API] Erro ao buscar batimentos:', error)
    throw error
  }
}

export async function getLatestLocalizacao(animalId) {
  try {
    const response = await api.get(`/localizacoes/animal/${animalId}`)
    console.log("[DEBUG] Dados de localizacoes:", response.data)
    return response.data?.content[0] || null
  } catch (error) {
    console.error('[API] Erro ao buscar localizacoes:', error)
    throw error
  }
}

// Funções para a API de estatísticas
export async function getMediaUltimos5Dias() {
  try {
    const response = await apiEstatistica.get('/batimentos/media-ultimos-5-dias');
    console.log("[DEBUG] Dados de médias dos últimos 5 dias:", response.data);

    if (!response.data.medias) {
      console.warn('[API] A propriedade medias não foi encontrada na resposta');
      return [];
    }

    // Transforma o objeto { "2025-06-01": 54.78, ... } em array [{ data: '2025-06-01', valor: 54.78 }, ...]
    const mediasArray = Object.entries(response.data.medias).map(([data, valor]) => ({
      data,
      valor
    }));

    return mediasArray;
  } catch (error) {
    console.error('[API] Erro ao buscar médias dos últimos 5 dias:', error);
    return [];
  }
}

export async function getEstatisticasCompletas() {
  try {
    const response = await apiEstatistica.get('/batimentos/estatisticas')
    console.log("[DEBUG] Dados de estatísticas completas:", response.data);
    return {
      media: response.data.media || 0,
      mediana: response.data.mediana || 0,
      moda: response.data.moda || 0,
      desvioPadrao: response.data.desvio_padrao || 0,
      assimetria: response.data.assimetria || 0
    }
  } catch (error) {
    console.error('[API] Erro ao buscar estatísticas completas:', error)
    return null
  }
}
