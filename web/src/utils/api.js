import axios from "axios"

export const animalId = "68194120636f719fcd5ee5fd";

const api = axios.create({
  baseURL: '/api', // Usando o proxy do Next.js
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

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

