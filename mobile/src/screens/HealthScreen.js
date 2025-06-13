import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, ScrollView, ActivityIndicator,
    StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity
} from 'react-native';
import {
    getMediaUltimos5Dias,
    getEstatisticasCompletas,
    getMediaPorData,
    getProbabilidadePorValor
} from '../services/apiEstatistica';
import GraficoBarras from '../components/GraficoBarras';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export default function HealthScreen({ animalId }) {
    const [healthData, setHealthData] = useState(null);
    const [mediasUltimos5Dias, setMediasUltimos5Dias] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [mediaPorData, setMediaPorData] = useState(null);
    const [valorDigitado, setValorDigitado] = useState('');
    const [probabilidade, setProbabilidade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMediaData, setLoadingMediaData] = useState(false);
    const [loadingProbabilidade, setLoadingProbabilidade] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [estatisticas, medias] = await Promise.all([
                    getEstatisticasCompletas(),
                    getMediaUltimos5Dias()
                ]);
                if (estatisticas) setHealthData(estatisticas);
                setMediasUltimos5Dias(medias);
            } catch (err) {
                console.error('Erro ao buscar estatísticas iniciais:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDateInput = (text) => {
        let cleanedText = text.replace(/\D/g, '');
        let formatted = '';
        if (cleanedText.length > 0) {
            formatted = cleanedText.substring(0, 2);
            if (cleanedText.length > 2) {
                formatted += '/' + cleanedText.substring(2, 4);
                if (cleanedText.length > 4) {
                    formatted += '/' + cleanedText.substring(4, 8);
                }
            }
        }
        setFormattedDate(formatted);
        if (cleanedText.length === 8) {
            const day = cleanedText.substring(0, 2);
            const month = cleanedText.substring(2, 4);
            const year = cleanedText.substring(4, 8);
            setSelectedDate(`${year}-${month}-${day}`);
        } else {
            setSelectedDate('');
            setMediaPorData(null);
        }
    };

    useEffect(() => {
        const buscarMedia = async () => {
            if (selectedDate) {
                setLoadingMediaData(true);
                setMediaPorData(null);
                try {
                    const resultado = await getMediaPorData(selectedDate);
                    setMediaPorData(resultado);
                } catch (error) {
                    console.error('Erro ao buscar média por data:', error);
                    setMediaPorData({ error: true });
                } finally {
                    setLoadingMediaData(false);
                }
            }
        };
        buscarMedia();
    }, [selectedDate]);

    const handleCalcularProbabilidade = async () => {
        if (!valorDigitado) {
            alert('Por favor, digite um valor para calcular a probabilidade.');
            return;
        }
        setLoadingProbabilidade(true);
        setProbabilidade(null);
        try {
            const resultado = await getProbabilidadePorValor(valorDigitado);
            setProbabilidade(resultado);
        } catch (error) {
            console.error('Erro ao buscar probabilidade:', error);
            setProbabilidade({ error: true });
        } finally {
            setLoadingProbabilidade(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <FontAwesomeIcon icon={faHeartbeat} size={120} color="#FF0000" style={styles.heartIcon} />
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#F39200" style={{ marginTop: 50 }} />
                    ) : (
                        <>
                            <Text style={styles.title}>Painel de Saúde</Text>
                            <Text style={styles.description}>
                                Frequência cardíaca, padrões de atividade e informações de saúde reunidas em um só lugar. Tenha controle total da saúde do seu pet.
                            </Text>

                            <Text style={styles.analysisTitle}>Média de batimentos dos últimos cinco dias:</Text>
                            <GraficoBarras data={mediasUltimos5Dias} />

                            {healthData && (
                                <>
                                    <Text style={styles.analysisTitle}>Análise Estatística da Frequência Cardíaca</Text>
                                    <View style={styles.card}>
                                        <View style={styles.statsRow}>
                                            <View style={styles.statItem}>
                                                <Text style={styles.statLabel}>Média:</Text>
                                                <Text style={styles.statValue}>{healthData.media?.toFixed(1) || '--'}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.statLabel}>Moda:</Text>
                                                <Text style={styles.statValue}>{healthData.moda?.toFixed(1) || '--'}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.statLabel}>Mediana:</Text>
                                                <Text style={styles.statValue}>{healthData.mediana?.toFixed(1) || '--'}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.secondaryStats}>
                                            <Text style={styles.secondaryStat}>
                                                Desvio Padrão: <Text style={styles.secondaryStatValue}>{healthData.desvioPadrao?.toFixed(1) || '--'}</Text>
                                            </Text>
                                            <Text style={styles.secondaryStat}>
                                                Assimetria: <Text style={styles.secondaryStatValue}>{healthData.assimetria?.toFixed(2) || '--'}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )}

                            <View style={styles.section}>
                                <Text style={styles.analysisTitle}>Média de batimento cardíaco por data</Text>
                                <Text style={styles.dataTitle}>Insira uma data:</Text>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="DD/MM/AAAA"
                                    value={formattedDate}
                                    onChangeText={formatDateInput}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                                
                                {loadingMediaData ? (
                                    <ActivityIndicator color="#F39200" style={{ marginTop: 10 }}/>
                                ) : (
                                    selectedDate && mediaPorData !== null && (
                                        <View style={styles.card}>
                                            {mediaPorData.error ? (
                                                <Text style={styles.statLabel}>Sem dados de batimento para a data selecionada</Text>
                                            ) : (
                                                <>
                                                    <Text style={styles.statLabel}>A média do dia é igual a:</Text>
                                                    <Text style={styles.largeValue}>{mediaPorData.toFixed(2)}</Text>
                                                </>
                                            )}
                                        </View>
                                    )
                                )}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.analysisTitle}>Probabilidade de Batimento</Text>
                                <Text style={styles.description}>
                                    Digite um valor e descubra a chance de o seu pet apresentar esse batimento cardíaco, com base no histórico real.
                                </Text>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="Insira o valor do batimento"
                                    keyboardType="numeric"
                                    value={valorDigitado}
                                    onChangeText={setValorDigitado}
                                />
                                <TouchableOpacity
                                    style={[styles.button, (!valorDigitado || loadingProbabilidade) && styles.buttonDisabled]}
                                    onPress={handleCalcularProbabilidade}
                                    disabled={!valorDigitado || loadingProbabilidade}
                                >
                                    <Text style={styles.buttonText}>Calcular Probabilidade</Text>
                                </TouchableOpacity>

                                {loadingProbabilidade ? (
                                    <ActivityIndicator color="#F39200" style={{ marginTop: 10 }}/>
                                ) : (
                                    probabilidade && (
                                        <View style={styles.probabilityCard}>
                                            {probabilidade.error ? (
                                                <Text style={styles.statLabel}>Não foi possível calcular. Tente outro valor.</Text>
                                            ) : (
                                                <>
                                                    <Text style={styles.dataTitle}>Probabilidade</Text>
                                                    <Text style={styles.probabilityPercent}>
                                                        {probabilidade.probabilidade_percentual?.toFixed(2)}%
                                                    </Text>

                                                    <Text style={styles.probabilityTitle}>{probabilidade.titulo}</Text>
                                                    
                                                    {probabilidade.probabilidade_percentual > 0 &&
                                                        <Text style={styles.probabilityDescription}>
                                                            A chance do seu pet apresentar {probabilidade.valor_informado} BPM é de {probabilidade.probabilidade_percentual?.toFixed(2)}%.
                                                        </Text>
                                                    }

                                                    <Text style={styles.probabilityEvaluation}>{probabilidade.avaliacao}</Text>
                                                </>
                                            )}
                                        </View>
                                    )
                                )}
                            </View>
                        </>
                    )}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    heartIcon: {
        position: 'absolute', top: 50, right: 20, opacity: 0.1, zIndex: -1,
    },
    scroll: { paddingHorizontal: 20 },
    scrollContent: { paddingTop: 40, paddingBottom: 250 },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 25,
    },
    description: {
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        marginBottom: 10,
        color: '#000',
        fontSize: 14,
        marginRight: 16,
        marginLeft: 16
    },
    section: { marginBottom: 20 },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        elevation: 2,
        alignItems: 'center',
    },
    probabilityCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        elevation: 2,
        alignItems: 'center',
    },
    dateInput: {
        backgroundColor: '#EEE',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 16,
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        alignSelf: 'center',
        width: '60%',
    },
    button: {
        backgroundColor: '#F39200',
        borderRadius: 25,
        paddingVertical: 9,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 5,
        elevation: 2,
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        textAlign: 'center',
    },
    statValue: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: '#000',
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        width: '100%',
    },
    statItem: { flex: 1, alignItems: 'center' },
    statLabel: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FF0000',
        marginBottom: 4,
        textAlign: 'center',
    },
    largeValue: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#000',
        textAlign: 'center',
        marginVertical: 5,
    },
    secondaryStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingTop: 12,
        width: '100%',
    },
    secondaryStat: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FF0000',
    },
    secondaryStatValue: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#000',
    },
    analysisTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: '#FF0000',
        marginVertical: 5,
        marginTop: 40,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    dataTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: '#FF0000',
        marginVertical: 5,
        textAlign: 'center',
    },
    probabilityPercent: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        marginVertical: 5,
    },
    probabilityTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 10,
    },
    probabilityDescription: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        color: '#000',
        marginBottom: 10,
    },
    probabilityEvaluation: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        color: '#000',
        marginTop: 10,
        textAlign: 'justify',
        marginRight: 8,
        marginLeft: 8
    },
});