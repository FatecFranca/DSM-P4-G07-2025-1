import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { getMediaUltimas5Horas } from '../services/apiEstatistica';

const GraficoLinha = () => {
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [loading, setLoading] = useState(true);
    const [minY, setMinY] = useState(0);
    const [maxY, setMaxY] = useState(100);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const resposta = await getMediaUltimas5Horas();
                const mediaPorHora = resposta.media_por_hora;

                if (!mediaPorHora || typeof mediaPorHora !== 'object') {
                    console.warn("Dados inválidos:", resposta);
                    setDadosGrafico([]);
                    setLoading(false);
                    return;
                }

                const dadosFormatados = Object.entries(mediaPorHora).map(([dataHora, valor]) => {
                    const data = new Date(dataHora);
                    const dia = String(data.getDate()).padStart(2, '0');
                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                    const hora = String(data.getHours()).padStart(2, '0');

                    return {
                        x: `${dia}/${mes} ${hora}h`,
                        y: valor
                    };
                });

                if (dadosFormatados.length > 0) {
                    const valoresY = dadosFormatados.map(dado => dado.y);
                    const min = Math.min(...valoresY);
                    const max = Math.max(...valoresY);

                    setMinY(min - 10);
                    setMaxY(max + 10);
                }

                setDadosGrafico(dadosFormatados);
            } catch (error) {
                console.error('Erro ao carregar dados do gráfico:', error);
                setDadosGrafico([]);
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#F39200" />
            </View>
        );
    }

    if (!dadosGrafico.length) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum dado disponível para exibir</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Gráfico de Batimento Cardíaco das últimas cinco horas:</Text>
            <VictoryChart
                theme={VictoryTheme.material}
                height={200}
                padding={{ top: 20, bottom: 70, left: 50, right: 60 }}
                domain={{ y: [minY, maxY] }}
            >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 10,
                            fill: '#000',
                            angle: -30,
                            padding: 15,
                        },
                        grid: { stroke: 'transparent' }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${Math.round(x)} BPM`}
                    style={{
                        tickLabels: { fontSize: 10, fill: '#FF0000' },
                        grid: { stroke: '#ccc' }
                    }}
                />
                <VictoryLine
                    data={dadosGrafico}
                    interpolation="linear"
                    style={{
                        data: { stroke: '#F39200', strokeWidth: 3 }
                    }}
                />
            </VictoryChart>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    titulo: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FF0000',
        marginBottom: 10,
        textAlign: 'center',
    },
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Poppins_400Regular',
    },
});

export default GraficoLinha;