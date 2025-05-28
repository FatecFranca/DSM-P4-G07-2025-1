import axios from "axios"

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