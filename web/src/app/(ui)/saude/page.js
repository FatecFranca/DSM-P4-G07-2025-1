"use client";

import { useState, useEffect } from "react";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { NavigationBar } from "@/components/ui/navigationBar";
import {
  animalId,
  getMediaUltimos5Dias,
  getEstatisticasCompletas,
  getMediaPorData,
} from "@/utils/api";
import { GraficoBarras } from "@/components/ui/grafico";

export default function SaudePage() {
  const [healthData, setHealthData] = useState({
    moda: "--",
    mediana: "--",
    desvioPadrao: "--",
    media: "--",
    assimetria: "--",
  });
  const [mediasUltimos5Dias, setMediasUltimos5Dias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para média por data
  const [selectedDate, setSelectedDate] = useState("");
  const [mediaPorData, setMediaPorData] = useState(null);
  const [loadingMediaData, setLoadingMediaData] = useState(false);

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

  // Puxa média quando a data mudar
  useEffect(() => {
    const fetchMediaPorData = async () => {
      if (!selectedDate) {
        setMediaPorData(null);
        return;
      }
      try {
        setLoadingMediaData(true);
        const media = await getMediaPorData(selectedDate);
        setMediaPorData(media);
      } catch (error) {
        console.error("Erro ao buscar média por data:", error);
        setMediaPorData(null);
      } finally {
        setLoadingMediaData(false);
      }
    };

    fetchMediaPorData();
  }, [selectedDate]);

  return (
    <div className="relative flex flex-col bg-[var(--color-background)] min-h-screen h-screen">
      <main className="flex-grow overflow-y-auto p-6 pb-70">
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

            <h2 className="text-sm md:text-base font-bold mb-2 text-center text-[var(--color-red)] whitespace-nowrap">
              Análise Estatística da Frequência Cardíaca
            </h2>
            <div className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md mb-6 max-w-md mx-auto">
              <div className="flex flex-col items-center text-center">
                {/* Linha 1 */}
                <div className="flex justify-between w-full mb-1 px-4">
                  <span className="text-[var(--color-red)] font-bold text-lg w-1/3">
                    Média:
                  </span>
                  <span className="text-[var(--color-red)] font-bold text-lg w-1/3">
                    Moda
                  </span>
                  <span className="text-[var(--color-red)] font-bold text-lg w-1/3">
                    Mediana
                  </span>
                </div>
                <div className="flex justify-between w-full mb-4 px-4">
                  <span className="text-black font-medium text-lg w-1/3">
                    {typeof healthData.media === "number"
                      ? healthData.media.toFixed(1)
                      : "--"}{" "}
                    bpm
                  </span>
                  <span className="text-black font-medium text-lg w-1/3">
                    {typeof healthData.moda === "number"
                      ? healthData.moda.toFixed(1)
                      : "--"}{" "}
                    bpm
                  </span>
                  <span className="text-black font-medium text-lg w-1/3">
                    {typeof healthData.mediana === "number"
                      ? healthData.mediana.toFixed(1)
                      : "--"}{" "}
                    bpm
                  </span>
                </div>

                {/* Linha 2 */}
                <div className="flex justify-between w-full px-4">
                  <span className="text-[var(--color-red)] font-bold text-base w-1/2">
                    Desvio Padrão:
                  </span>
                  <span className="text-[var(--color-red)] font-bold text-base w-1/2">
                    Assimetria:
                  </span>
                </div>
                <div className="flex justify-between w-full px-4">
                  <span className="text-black font-medium text-base w-1/2">
                    {typeof healthData.desvioPadrao === "number"
                      ? healthData.desvioPadrao.toFixed(1)
                      : "--"}
                  </span>
                  <span className="text-black font-medium text-base w-1/2">
                    {typeof healthData.assimetria === "number"
                      ? healthData.assimetria.toFixed(2)
                      : "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Média por data fora do card */}
            <h3 className="text-[var(--color-red)] font-bold text-base text-center mb-2">
              Média de batimento Cardíaco por data
            </h3>
            <p className="text-[var(--color-red)] text-sm text-center mb-2 font-bold">
              Insira uma data:
            </p>

            {/* input de data */}
              <input
                id="data-batimento"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[var(--color-gray-light)] rounded-3xl px-3 py-2 text-base font-medium border border-gray-300 w-42 mx-auto block mb-3"
            />


            

            {/* Card resultado média */}
            <div className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md max-w-xs mx-auto">
              <p className="text-[var(--color-red)] font-bold text-base md:text-lg text-center">
                A média do dia é igual a:
              </p>
              <p className="text-black font-semibold text-2xl mt-1 text-center">
                {loadingMediaData ? (
                  <span className="loading loading-spinner"></span>
                ) : typeof mediaPorData === "number" ? (
                  mediaPorData.toFixed(2)
                ) : (
                  "--"
                )}
              </p>
            </div>
          </>
        )}
      </main>

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
