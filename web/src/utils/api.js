import axios from "axios";
import { NormalizeError } from "next/dist/shared/lib/utils";

// Base URL da sua API Swagger (ajuste para a sua real URL)
const api = axios.create({
  baseURL: "https://dsm-p4-g07-2025-7.onrender.com",
  timeout: 20000,
});

// Função para pegar info do animal pelo id
export async function getAnimalInfo(animalId) {
  try {
    const response = await api.get(`/animais/${animalId}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar info do animal:", error);
    throw error;
  }
}

