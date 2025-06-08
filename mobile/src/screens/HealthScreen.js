import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,ScrollView,ActivityIndicator} from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import {getMediaUltimos5Dias,getEstatisticasGerais} from '../services/apiEstatistica';
import NavigationBar from '../components/NavigationBar/index';
import ExpandableMenu from '../components/ExpandableMenu/ExpandableMenu';

export default function SaudeScreen({ activeScreen, onNavigate }) {
    const [healthData, setHealthData] = useState({
        moda: "--",
        mediana: "--",
        desvioPadrao: "--",
        media: "--",
        assimetria: "--"
    });
    const [mediasUltimos5Dias, setMediasUltimos5Dias] = useState([]);
    const [loading, setLoading] = useState(true);

    const animalId = '68194120636f719fcd5ee5fd';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [estatisticas, mediasResponse] = await Promise.all([
                    getEstatisticasGerais(animalId),
                    getMediaUltimos5Dias(animalId)
                ]);

                const mediasFormatadas = mediasResponse.content.map(item => ({
                    data: new Date(item.data).toLocaleDateString('pt-BR').split('/')[0],
                    valor: item.frequenciaMedia
                }));

                setHealthData({
                    media: estatisticas.media,
                    mediana: estatisticas.mediana,
                    moda: estatisticas.moda,
                    desvioPadrao: estatisticas.desvioPadrao,
                    assimetria: estatisticas.assimetria
                });

                setMediasUltimos5Dias(mediasFormatadas);
            } catch (error) {
                console.error("Erro ao buscar dados de saúde:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF0000" />
                <Text style={styles.loadingText}>Carregando dados de saúde...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.titulo}>Painel de Saúde</Text>
                <Text style={styles.subtitulo}>
                    Frequência cardíaca, padrões de atividade e informações de saúde reunidas em um só lugar.
                    Tenha controle total da saúde do seu pet.
                </Text>

                <Text style={styles.sectionTitle}>Média de batimentos dos últimos cinco dias:</Text>

                <View style={styles.chartContainer}>
                    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                        <VictoryAxis
                            tickValues={mediasUltimos5Dias.map((_, i) => i + 1)}
                            tickFormat={mediasUltimos5Dias.map(item => item.data)}
                        />
                        <VictoryAxis dependentAxis />
                        <VictoryBar
                            data={mediasUltimos5Dias}
                            x="data"
                            y="valor"
                            style={{ data: { fill: "#FF0000" } }}
                        />
                    </VictoryChart>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Análise Estatística da Frequência Cardíaca</Text>
                    <View style={styles.statsGrid}>
                        <StatItem label="Média geral" value={healthData.media} />
                        <StatItem label="Mediana" value={healthData.mediana} />
                        <StatItem label="Moda" value={healthData.moda} />
                        <StatItem label="Desvio padrão" value={healthData.desvioPadrao} />
                    </View>
                </View>
            </ScrollView>

            <ExpandableMenu animalId={animalId} />
            <NavigationBar activeScreen={activeScreen} onNavigate={onNavigate} />
        </View>
    );
}

const StatItem = ({ label, value }) => (
    <View style={styles.statItem}>
        <Text style={styles.statLabel}>{label}:</Text>
        <Text style={styles.statValue}>
            {typeof value === 'number' ? value.toFixed(1) : value} {label.includes('Desvio') ? '' : 'bpm'}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: 'Poppins_600SemiBold',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 120,
    },
    titulo: {
        fontSize: 24,
        color: '#FF0000',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitulo: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#FF0000',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginBottom: 16,
    },
    chartContainer: {
        height: 250,
        marginBottom: 20,
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 10,
    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statItem: {
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Poppins_400Regular',
    },
    statValue: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Poppins_600SemiBold',
    },
});
