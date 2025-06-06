"use client";

import { useState, useEffect } from "react";
import { ExpandableMenu } from "@/components/ui/expandableMenu";
import { NavigationBar } from "@/components/ui/navigationBar";
import { getAnimalInfo, getLatestBatimentos } from "@/utils/api";
import { animalId } from "@/utils/api";

export default function SaudePage() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [batimentos, animalInfo] = await Promise.all([
          getLatestBatimentos(animalId),
          getAnimalInfo(animalId)
        ]);
        
        const mockHealthData = {
          media: "78,82",
          moda: "87,00",
          mediana: "87,00",
          desvioPadrao: "18,75",
          assimetria: "-0,56",
          ultimoBatimento: batimentos,
          probabilidade: "95%"
        };

        setHealthData(mockHealthData);
      } catch (error) {
        console.error("Erro ao buscar dados de saúde:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-screen flex flex-col">
      {/* Área de conteúdo com scroll */}
      <main className="flex-1 overflow-y-auto pb-20">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <span className="loading loading-spinner text-[var(--color-orange)] text-4xl"></span>
              <p className="mt-4 text-lg">Carregando dados de saúde...</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-[var(--color-red)] mb-4">
              Painel de Saúde
            </h1>
            
            <p className="text-gray-700 mb-6">
              Frequência cardíaca, padrões de atividade e<br />
              informações de saúde reunidas em um só lugar.<br />
              Tudo sobre a saúde do seu pet.
            </p>

            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-3">
                Média de batimentos das últimas cinco dias:
              </h2>
              
              <div className="grid grid-cols-2 gap-2">
                <StatItem label="Média" value={healthData?.media || "--"} />
                <StatItem label="Moda" value={healthData?.moda || "--"} />
                <StatItem label="Mediana" value={healthData?.mediana || "--"} />
                <StatItem label="Desvio Padrão" value={healthData?.desvioPadrao || "--"} />
                <StatItem label="Assimetria" value={healthData?.assimetria || "--"} />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-3">
                Próximas características:
              </h2>
              
              <h3 className="font-medium mb-2">Probabilidade de Batimento</h3>
              <p className="text-gray-700 text-sm mb-4">
                Explica a probabilidade do seu pet apresentar um batimento cardíaco, 
                com base na atividade real.
              </p>
              
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Último batimento registrado: {healthData?.ultimoBatimento || "--"} BPM
                </p>
                <p className="text-sm">
                  Com base nos dados coletados nas últimas 5 dias, o 
                  batimento do seu pet apresenta {healthData?.probabilidade || "--"} de probabilidade.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
              <p className="text-sm mb-3">
                Este batimento é significativamente mais alto do que
                os valores normais registrados.
              </p>
              <p className="text-sm">
                Recomendamos observar os níveis de atividade, 
                temperatura ambiente ou procurar orientação veterinária
                se o valor for recorrente.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Menu expansível - mantém a mesma cor da home */}
      <ExpandableMenu animalId={animalId} backgroundColor="var(--color-white-matte)" />

      {/* Barra de navegação */}
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