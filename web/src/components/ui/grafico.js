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
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={processedData}
        margin={{ top: 30, right: 20, left: 30, bottom: 70 }} // menor margem à esquerda
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="data"
          tickLine={false}
          height={60}
          tick={({ x, y, payload, index }) => (
            <>
              {index === 0 && (
                <text
                  x={x - 30} // deslocamento ajustado para mobile
                  y={y + 15}
                  fill="var(--color-red)"
                  fontWeight="bold"
                  fontSize="clamp(12px, 2vw, 14px)"
                  textAnchor="middle"
                >
                  {anoInicial}
                </text>
              )}
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
            </>
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
          width={40} // reduzido para mobile
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
  );
}
