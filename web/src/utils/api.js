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
export const apiEstatistica = axios.create({
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

// Função para pegar média por data (com intervalo inicio e fim iguais)
export async function getMediaPorData(data) {
  try {
    console.log(`[API] Buscando média por data: ${data}`);

    // Aqui usamos inicio e fim iguais para pegar dados de um dia específico
    const response = await apiEstatistica.get(
      `/batimentos/media-por-data`,
      {
        params: {
          inicio: data,
          fim: data,
        }
      }
    );

    console.log("[DEBUG] Resposta média por data:", response.data);

    // Considerando que a resposta retorna o valor direto
    // Ajuste aqui conforme o formato real da API
    if (typeof response.data.media === "number") {
      return response.data.media;
    }

    // Caso seja um array ou outro formato, ajuste conforme necessário
    // Se não encontrou o dado esperado, retorna null
    return null;
  } catch (error) {
    console.error('[API] Erro ao buscar média por data:', error);
    return null;
  }
}

export async function getProbabilidadePorValor(valor) {
  try {
    const response = await apiEstatistica.get(`/batimentos/probabilidade?valor=${valor}`);
    console.log("[DEBUG] Resposta probabilidade por valor:", response.data);
    return response.data;
  } catch (error) {
    console.error("[API] Erro ao buscar probabilidade por valor:", error);
    throw error;
  }
}

export async function getMediaUltimas5Horas() {
  try {
    const response = await apiEstatistica.get('/batimentos/media-ultimas-5-horas-registradas');
    console.log("[DEBUG] Dados de médias das últimas 5 horas:", response.data);

    if (!response.data.media_por_hora) {
      console.warn('[API] A propriedade media_por_hora não foi encontrada na resposta');
      return { media: 0, dados: [] };
    }
    

    // Transforma o objeto em array e formata as horas
    const dadosArray = Object.entries(response.data.media_por_hora)
      .map(([dataHora, valor]) => {
        const dataObj = new Date(dataHora);

        return {
          hora: [
            dataObj.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
            dataObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          ],
          valor,
          data: dataObj,
        };
      })
      .sort((a, b) => a.data - b.data); // ordena com precisão

    return {
      media: response.data.media,
      dados: dadosArray
    };

  } catch (error) {
    console.error('[API] Erro ao buscar médias das últimas 5 horas:', error);
    return { media: 0, dados: [] };
  }
}

export async function getRegressaoCorrelacao() {
  try {
    const response = await apiEstatistica.get('/batimentos/regressao');
    console.log("[DEBUG] Dados de regressão e correlação:", response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Erro ao buscar dados de regressão e correlação:', error);
    return null;
  }
}

export async function calcularPrevisao (acelerometroX,acelerometroY,acelerometroZ) {
  try {
    const response = await apiEstatistica.get('/batimentos/predizer',
      {
        params: {
          acelerometroX: acelerometroX,
          acelerometroY: acelerometroY,
          acelerometroZ: acelerometroZ
        }
      }
    );
    return response.data.frequencia_prevista;
  } catch (error) {
    console.error("Erro ao calcular previsão:", error);
  }
};
