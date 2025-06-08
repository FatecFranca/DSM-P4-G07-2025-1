"use client";

import { useState, useEffect } from "react";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { NavigationBar } from "@/components/ui/navigationBar";
import {animalId, getMediaUltimos5Dias, getEstatisticasCompletas, getMediaPorData, getProbabilidadePorValor, } from "@/utils/api";
import { GraficoBarras } from "@/components/ui/grafico";
import {faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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

  const [selectedDate, setSelectedDate] = useState("");
  const [mediaPorData, setMediaPorData] = useState(null);
  const [loadingMediaData, setLoadingMediaData] = useState(false);

  const [valorTemporario, setValorTemporario] = useState(""); 
  const [valorDigitado, setValorDigitado] = useState("");     
  const [probabilidade, setProbabilidade] = useState(null);
  const [loadingProbabilidade, setLoadingProbabilidade] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [estatisticas, medias] = await Promise.all([
          getEstatisticasCompletas(),
          getMediaUltimos5Dias(),
        ]);
        setHealthData(estatisticas);
        setMediasUltimos5Dias(medias);
      } catch (error) {
        console.error("Erro ao buscar dados de saúde:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    const fetchProbabilidade = async () => {
      if (!valorDigitado) {
        setProbabilidade(null);
        return;
      }
      try {
        setLoadingProbabilidade(true);
        const resultado = await getProbabilidadePorValor(valorDigitado);
        setProbabilidade(resultado);
      } catch (error) {
        console.error("Erro ao buscar probabilidade:", error);
        setProbabilidade(null);
      } finally {
        setLoadingProbabilidade(false);
      }
    };

    fetchProbabilidade();
  }, [valorDigitado]);

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
            {/* Cabeçalho - Centralizado em todas as telas */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[var(--color-red)] mb-2">
                Painel de Saúde
              </h1>
              <p className="text-base font-medium text-black max-w-2xl mx-auto leading-snug">
                Frequência cardíaca, padrões de atividade e informações de saúde
                reunidas em um só lugar. Tenha controle total da saúde do seu pet.
              </p>
            </div>

            {/* Container principal - Centralizado na web */}
            <div className="lg:flex lg:flex-col lg:items-center">
              {/* Primeira linha - Gráfico e Estatísticas */}
              <div className="lg:flex lg:justify-center lg:w-full lg:max-w-5xl lg:gap-6 lg:mb-6">
                {/* Gráfico - Centralizado na web */}
                <div className="lg:w-1/2 mb-6 lg:mb-0 lg:flex lg:flex-col lg:items-center">
                  <h2 className="text-sm md:text-base font-bold mb-1 text-center text-[var(--color-red)] whitespace-nowrap">
                    Média de batimentos dos últimos cinco dias:
                  </h2>
                  <div className="lg:w-full lg:flex lg:justify-center">
                    <GraficoBarras data={mediasUltimos5Dias} />
                  </div>
                </div>
                
                {/* Estatísticas - Centralizado na web */}
                <div className="lg:w-1/2 lg:flex lg:flex-col lg:items-center">
                  <h2 className="text-sm md:text-base font-bold mb-2 text-center text-[var(--color-red)] whitespace-nowrap">
                    Análise Estatística da Frequência Cardíaca
                  </h2>
                  <div className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md max-w-md mx-auto lg:mx-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex justify-between w-full mb-1 px-4">
                        <span className="text-[var(--color-red)] font-bold text-lg w-1/3">Média:</span>
                        <span className="text-[var(--color-red)] font-bold text-lg w-1/3">Moda:</span>
                        <span className="text-[var(--color-red)] font-bold text-lg w-1/3">Mediana:</span>
                      </div>
                      <div className="flex justify-between w-full mb-4 px-4">
                        <span className="text-black font-medium text-lg w-1/3">{healthData.media?.toFixed?.(1) || "--"}</span>
                        <span className="text-black font-medium text-lg w-1/3">{healthData.moda?.toFixed?.(1) || "--"}</span>
                        <span className="text-black font-medium text-lg w-1/3">{healthData.mediana?.toFixed?.(1) || "--"}</span>
                      </div>

                      <div className="flex justify-between w-full px-4">
                        <span className="text-[var(--color-red)] font-bold text-base w-1/2">Desvio Padrão:</span>
                        <span className="text-[var(--color-red)] font-bold text-base w-1/2">Assimetria:</span>
                      </div>
                      <div className="flex justify-between w-full px-4">
                        <span className="text-black font-medium text-base w-1/2">{healthData.desvioPadrao?.toFixed?.(1) || "--"}</span>
                        <span className="text-black font-medium text-base w-1/2">{healthData.assimetria?.toFixed?.(2) || "--"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segunda linha - Média por data e Probabilidade */}
              <div className="lg:flex lg:justify-center lg:w-full lg:max-w-5xl lg:gap-6">
                {/* Média por data - Centralizado na web */}
                <div className="lg:w-1/2 mb-6 lg:mb-0 lg:flex lg:flex-col lg:items-center">
                  <div className="max-w-xs mx-auto lg:mx-0">
                    <h3 className="text-[var(--color-red)] font-bold text-base text-center mb-2">
                      Média de batimento Cardíaco por data
                    </h3>
                    <p className="text-[var(--color-red)] text-sm text-center mb-2 font-bold">
                      Insira uma data:
                    </p>

                    <div className="flex justify-center">
                      <input
                        id="data-batimento"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-[var(--color-gray-light)] rounded-3xl px-3 py-2 text-base font-medium border border-gray-300 w-42"
                      />
                    </div>

                    <div className="bg-[var(--color-white-matte)] rounded-lg p-4 shadow-md mt-3">
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
                  </div>
                </div>
                
                {/* Probabilidade - Centralizado na web */}
                <div className="lg:w-1/2 lg:flex lg:flex-col lg:items-center">
                  <div className="max-w-xs mx-auto lg:mx-0">
                    <h3 className="text-[var(--color-red)] font-bold text-base text-center mb-1">
                      Probabilidade de Batimento
                    </h3>

                    <p className="text-black font-semibold text-sm text-center mb-4 px-2">
                      Digite um valor e descubra a chance de o seu pet apresentar esse batimento cardíaco, com base no histórico real.
                    </p>

                    <div className="flex justify-center">
                      <input
                        type="number"
                        placeholder="Insira o valor"
                        value={valorTemporario}
                        onChange={(e) => setValorTemporario(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setValorDigitado(valorTemporario);
                          }
                        }}
                        className="bg-[var(--color-gray-light)] rounded-3xl px-3 py-2 text-base font-medium border border-gray-300 w-42 text-center"
                      />
                    </div>

                    {valorDigitado && (
                      <div className="text-center mb-6">
                        <p className="text-[var(--color-red)] font-bold text-sm">Você digitou:</p>
                        <p className="text-black font-semibold text-lg">{valorDigitado} BPM</p>

                        <p className="text-[var(--color-red)] font-bold mt-3">Probabilidade:</p>
                        <p className="text-black font-semibold text-lg">
                          {loadingProbabilidade ? (
                            <span className="loading loading-spinner"></span>
                          ) : probabilidade?.probabilidade_percentual !== undefined ? (
                            `${probabilidade.probabilidade_percentual.toFixed(2)}%`
                          ) : (
                            "--"
                          )}
                        </p>

                        {!loadingProbabilidade &&
                      probabilidade?.titulo && (
                        <div className="mt-4 px-4 text-sm text-black text-center">
                          <p className="text-base font-semibold mb-1 text-[var(--color-red)]">
                            {probabilidade.titulo}
                          </p>

                          {probabilidade?.probabilidade_percentual !== undefined ? (
                            <>
                              <p>
                                A chance do seu pet apresentar{" "}
                                <span className="font-semibold">{probabilidade.valor_informado} BPM</span> é de{" "}
                                <span className="font-semibold">
                                  {probabilidade.probabilidade_percentual.toFixed(2)}%
                                </span>.
                              </p>
                              <p className="mt-2">{probabilidade.avaliacao}</p>
                            </>
                          ) : (
                            <p className="mt-2">{probabilidade.avaliacao}</p>
                          )}
                        </div>
                      )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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