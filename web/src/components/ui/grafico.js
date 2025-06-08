"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

export function GraficoBarras({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center">Nenhum dado disponível</p>;
  }

  const processedData = data
    .slice()
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .map(({ data, valor }) => ({
      rawDate: new Date(data),
      data: new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      valor,
    }));

  const anoInicial = data.length > 0 ? data[0].data.slice(0, 4) : "";
  const maxValor = Math.max(...processedData.map((item) => item.valor));
  const tetoTicks = Math.ceil(maxValor / 10) * 10;
  const yTicks = [];
  for (let i = 0; i <= tetoTicks; i += 10) {
    yTicks.push(i);
  }

  return (
    <div
      className="w-full px-0"
      style={{ height: "240px", maxHeight: "280px" }} // altura reduzida para mobile
    >
      {/* Exibe o ano acima do gráfico */}
      <div className="text-center mb-0">
        <span className="text-red-600 font-bold text-sm md:text-base">
          {anoInicial}
        </span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{ top: 10, right: 5, left: 5, bottom: 20 }} // margem inferior menor
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="data"
            tickLine={false}
            height={60}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y + 15}
                fill="black"
                fontWeight="bold"
                fontSize="clamp(11px, 1.8vw, 13px)"
                textAnchor="middle"
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis
            domain={[0, tetoTicks]}
            ticks={yTicks}
            tick={{
              fill: "var(--color-red)",
              fontWeight: "bold",
              fontSize: "clamp(11px, 1.8vw, 13px)",
            }}
            width={30}
            tickCount={yTicks.length}
            tickFormatter={(value) => value.toString()}
          />
          <Tooltip formatter={(value) => [`${value.toFixed(1)} bpm`, "Batimentos"]} />
          <Bar dataKey="valor" fill="var(--color-orange)">
            <LabelList
              dataKey="valor"
              position="center"
              fill="var(--color-white)"
              fontWeight="bold"
              fontSize="clamp(11px, 2vw, 14px)"
              formatter={(value) => value.toFixed(1)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
