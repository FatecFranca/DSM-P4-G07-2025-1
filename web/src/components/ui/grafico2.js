"use client";

import { useEffect, useState } from "react";
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
  const [dadosGrafico, setDadosGrafico] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        const { media, dados } = await getMediaUltimas5Horas();

        const rootStyles = getComputedStyle(document.documentElement);
        setColorVars({
          orange: rootStyles.getPropertyValue("--color-orange").trim(),
          red: rootStyles.getPropertyValue("--color-red").trim(),
        });

        setDadosGrafico({ media, dados });
      } catch (error) {
        console.error("Erro ao carregar dados do gráfico:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-[var(--color-orange)]"></span>
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
    Gráfico de Batimento Cardíaco das últimas cinco horas:
  </p>
</div>

      <div className="w-full" style={{ 
        height: chartDimensions.height, 
        maxHeight: chartDimensions.maxHeight 
      }}>
        <div className="relative w-full h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}