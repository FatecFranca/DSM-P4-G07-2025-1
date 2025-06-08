"use client";

import { useState, useEffect } from "react";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { NavigationBar } from "@/components/ui/navigationBar";
import {
  animalId,
  getMediaUltimos5Dias,
  getEstatisticasCompletas,
} from "@/utils/api";
import { GraficoBarras } from "@/components/ui/grafico";

export default function SaudePage() {
  const [healthData, setHealthData] = useState({
    moda: "--",
    mediana: "--",
    desvioPadrao: "--",
    media: "--",
  });
  const [mediasUltimos5Dias, setMediasUltimos5Dias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [estatisticas, medias] = await Promise.all([
          getEstatisticasCompletas(),
          getMediaUltimos5Dias(),
        ]);

        setHealthData({
          ...estatisticas,
        });

        setMediasUltimos5Dias(medias);
      } catch (error) {
        console.error("Erro ao buscar dados de saúde:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col bg-[var(--color-background)] min-h-screen h-screen">
      {/* Conteúdo principal flexível e scrollable */}
      <main className="flex-grow overflow-y-auto p-6 pb-36">
        {loading ? (
          <div className="flex items-center justify-center h-full bg-[var(--color-background)]">
            <div className="text-center">
              <span className="loading loading-spinner text-[var(--color-orange)] text-4xl"></span>
              <p className="mt-4 text-lg">Carregando dados de saúde...</p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-[var(--color-red)] text-center mb-4">
              Painel de Saúde
            </h1>

            <div className="flex justify-center">
              <p
                className="
                  max-w-[320px] md:max-w-full
                  text-base font-medium text-black text-center leading-snug mb-6
                  break-words
                  whitespace-normal md:whitespace-nowrap
                "
              >
                Frequência cardíaca, padrões de atividade e informações de saúde
                reunidas em um só lugar. Tenha controle total da saúde do seu pet.
              </p>
            </div>

            <h2 className="text-sm md:text-base font-bold mb-1 text-center text-[var(--color-red)] whitespace-nowrap">
              Média de batimentos dos últimos cinco dias:
            </h2>
            <GraficoBarras data={mediasUltimos5Dias} />

            <div className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md mb-4 max-w-full break-words">
              <h2 className="text-sm md:text-base font-bold mb-3 text-center text-[var(--color-red)] whitespace-nowrap">
                Análise Estatística da Frequência Cardíaca
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <StatItem
                  label="Média geral"
                  value={`${
                    typeof healthData.media === "number"
                      ? healthData.media.toFixed(1)
                      : "--"
                  } bpm`}
                />
                <StatItem
                  label="Mediana"
                  value={`${
                    typeof healthData.mediana === "number"
                      ? healthData.mediana.toFixed(1)
                      : "--"
                  } bpm`}
                />
                <StatItem
                  label="Moda"
                  value={`${
                    typeof healthData.moda === "number"
                      ? healthData.moda.toFixed(1)
                      : "--"
                  } bpm`}
                />
                <StatItem
                  label="Desvio padrão"
                  value={`${
                    typeof healthData.desvioPadrao === "number"
                      ? healthData.desvioPadrao.toFixed(1)
                      : "--"
                  }`}
                />
              </div>
            </div>

            {/* Cards extras para testar scroll */}
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md mb-4 max-w-full"
              >
                <h3 className="text-base font-semibold mb-2 text-center text-[var(--color-red)]">
                  Card Extra #{n}
                </h3>
                <p className="text-sm text-gray-700 text-center">
                  Conteúdo extra para testar o scroll na página.
                </p>
              </div>
            ))}
          </>
        )}
      </main>

      {/* Menus fixos com posição fixa e z-index alto */}
      <ExpandableMenu
        animalId={animalId}
        backgroundColor="var(--color-white-matte)"
        className="fixed bottom-16 left-0 right-0 z-50"
      />
      <NavigationBar
        activePage="saude"
        activeColor="var(--color-red)"
        className="fixed bottom-0 left-0 right-0 z-50"
      />
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1 px-2">
      <span className="text-gray-600 text-sm">{label}:</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
}
