"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getMediaUltimas5Horas } from "@/utils/api";

const GraficoContext = createContext(null);

export function GraficoLinhasProvider({ children }) {
  const [dadosGrafico, setDadosGrafico] = useState(null);
  const [loadingGrafico, setLoadingGrafico] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoadingGrafico(true);
        const { media, dados } = await getMediaUltimas5Horas();
        setDadosGrafico({ media, dados });
      } catch (error) {
        console.error("Erro ao carregar dados do gráfico:", error);
      } finally {
        setLoadingGrafico(false);
      }
    };

    carregarDados();
  }, []);

  return (
    <GraficoContext.Provider value={{ dadosGrafico, loadingGrafico }}>
      {children}
    </GraficoContext.Provider>
  );
}

export function useGraficoLinhas() {
  return useContext(GraficoContext);
}
