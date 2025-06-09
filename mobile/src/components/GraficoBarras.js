import React from 'react';
import { View, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory-native';

export default function GraficoBarras({ data }) {
    if (!data || data.length === 0) {
        return <Text style={{ textAlign: 'center', color: '#666' }}>Nenhum dado disponível</Text>;
    }

    const processedData = data
        .slice()
        .sort((a, b) => new Date(a.data) - new Date(b.data))
        .map(({ data, valor }) => ({
            x: new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            y: valor,
            label: `${Math.round(valor)}`
        }));

    return (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ 
                textAlign: 'center', 
                fontFamily: 'Poppins_600SemiBold', 
                fontSize: 16, 
                color: '#FF0000',
                marginBottom: 10
            }}>
                {data[0]?.data?.slice(0, 4)}
            </Text>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 30 }}
                height={250}
                padding={{ top: 40, bottom: 50, left: 50, right: 50 }}
            >
                <VictoryAxis 
                    style={{
                        axis: { stroke: "#FF0000" },
                        tickLabels: { fill: "#000", fontFamily: 'Poppins_400Regular', fontSize: 10 }
                    }}
                />
                <VictoryAxis 
                    dependentAxis 
                    style={{
                        axis: { stroke: "#FF0000" },
                        tickLabels: { fill: "#000", fontFamily: 'Poppins_400Regular', fontSize: 10 }
                    }}
                />
                <VictoryBar
                    data={processedData}
                    barRatio={0.8}
                    style={{ 
                        data: { fill: '#F39200' },
                        labels: { 
                            fill: "#FFF", 
                            fontFamily: 'Poppins_600SemiBold', 
                            fontSize: 12,
                        }
                    }}
                    labels={({ datum }) => datum.label}
                    labelComponent={
                        <VictoryLabel 
                            dy={-15}
                            verticalAnchor="middle"
                        />
                    }
                />
            </VictoryChart>
        </View>
    );
}