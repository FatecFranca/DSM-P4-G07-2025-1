"use client";

import { useGraficoLinhas } from "@/app/context/GraficoLinhasContext";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getMediaUltimas5Horas } from "@/utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function GraficoLinhas() {
  const { dadosGrafico, loadingGrafico } = useGraficoLinhas();
  const [colorVars, setColorVars] = useState({
    orange: "#F39200",
    red: "#FF0000",
  });
  const [chartDimensions, setChartDimensions] = useState({
    height: "240px",
    maxHeight: "280px"
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // breakpoint para mobile
        setChartDimensions({
          height: "180px",
          maxHeight: "220px"
        });
      } else {
        setChartDimensions({
          height: "240px",
          maxHeight: "280px"
        });
      }
    };

    // Configura inicialmente
    handleResize();

    // Adiciona listener
    window.addEventListener('resize', handleResize);

    // Remove listener ao desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const { media, dados } = await getMediaUltimas5Horas();

        const rootStyles = getComputedStyle(document.documentElement);
        setColorVars({
          orange: rootStyles.getPropertyValue("--color-orange").trim(),
          red: rootStyles.getPropertyValue("--color-red").trim(),
        });

      } catch (error) {
        console.error("Erro ao carregar dados do gráfico:", error);
      } finally {
      }
    };

    carregarDados();
  }, []);

  if (loadingGrafico) {
    return (
      <div className="flex justify-center items-center h-40">
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin text-[var(--color-orange)] text-xl flex-shrink-0"
        />
      </div>
    );
  }



  if (!dadosGrafico || dadosGrafico.dados.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Nenhum dado disponível para exibir
      </div>
    );
  }

  const data = {
    labels: dadosGrafico.dados.map((item) => item.hora),
    datasets: [
      {
        label: "BPM",
        data: dadosGrafico.dados.map((item) => item.valor),
        borderColor: colorVars.orange,
        backgroundColor: "transparent",
        borderWidth: 3,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} BPM`;
          },
        },
        displayColors: false,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          weight: "bold",
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: colorVars.red,
          font: {
            weight: "bold",
            size: 12,
          },
          callback: function (value) {
            return value + " BPM";
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#000",
          font: {
            weight: "bold",
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="text-center mb-4 md:mb-6">
        <p className="text-[var(--color-red)] font-bold text-xs whitespace-nowrap">
          Batimento cardíaco das últimas cinco horas coletadas:
        </p>
      </div>

      <div className="w-full h-full px-4 py-4">
        <div className="relative w-full h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}