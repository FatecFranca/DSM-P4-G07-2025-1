"use client";

import { useState, useEffect } from "react";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { NavigationBar } from "@/components/ui/navigationBar";
import { 
  getLatestBatimentos, 
  animalId, 
  getMediaUltimos5Dias, 
  getEstatisticasCompletas
} from "@/utils/api";

export default function SaudePage() {
  const [healthData, setHealthData] = useState({
    moda: "--",
    mediana: "--",
    desvioPadrao: "--",
    media: "--"
  });
  const [mediasUltimos5Dias, setMediasUltimos5Dias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [estatisticas, medias] = await Promise.all([
          getEstatisticasCompletas(),
          getMediaUltimos5Dias()
        ]);

        setHealthData({
          ...estatisticas
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
    <div className="relative flex flex-col bg-[var(--color-background)] min-h-screen">
      <main className="flex-grow overflow-y-auto pb-20 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]">
            <div className="text-center">
              <span className="loading loading-spinner text-[var(--color-orange)] text-4xl"></span>
              <p className="mt-4 text-lg">Carregando dados de saúde...</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
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
                Frequência cardíaca, padrões de atividade e informações de saúde reunidas em um só lugar. Tenha controle total da saúde do seu pet.
              </p>
            </div>

            {/* Card das médias dos últimos 5 dias */}
            <div className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md mb-6 max-w-full break-words">
              <h2 className="text-base font-bold mb-3 text-center text-[var(--color-red)] break-words max-w-full">
                Média de batimentos dos últimos cinco dias:
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {mediasUltimos5Dias.length > 0 ? (
                  mediasUltimos5Dias.map(({ data, valor }, i) => (
                    <StatItem key={i} label={data} value={`${valor.toFixed(1)} bpm`} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center">Nenhum dado disponível</p>
                )}
              </div>
            </div>

            {/* Card de estatísticas */}
            <div className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md mb-6 max-w-full break-words">
              <h2 className="text-base font-bold mb-3 text-center text-[var(--color-red)] break-words max-w-full">
                Análise Estatística da Frequência Cardíaca
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <StatItem
                  label="Média geral"
                  value={`${typeof healthData.media === "number" ? healthData.media.toFixed(1) : "--"} bpm`}
                />
                <StatItem
                  label="Mediana"
                  value={`${typeof healthData.mediana === "number" ? healthData.mediana.toFixed(1) : "--"} bpm`}
                />
                <StatItem
                  label="Moda"
                  value={`${typeof healthData.moda === "number" ? healthData.moda.toFixed(1) : "--"} bpm`}
                />
                <StatItem
                  label="Desvio padrão"
                  value={`${typeof healthData.desvioPadrao === "number" ? healthData.desvioPadrao.toFixed(1) : "--"}`}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <ExpandableMenu animalId={animalId} backgroundColor="var(--color-white-matte)" />
      <NavigationBar activePage="saude" activeColor="var(--color-red)" />
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
