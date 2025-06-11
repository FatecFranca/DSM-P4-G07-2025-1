import React, { useEffect, useState, useRef } from 'react';
import {
    View, Text, TextInput, ScrollView, ActivityIndicator,
    StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import ExpandableMenu from '../components/ExpandableMenu/ExpandableMenuSaude';
import NavigationBar from '../components/NavigationBar';
import {
    animalId,
    getMediaUltimos5Dias,
    getEstatisticasCompletas,
    getMediaPorData,
    getProbabilidadePorValor
} from '../services/apiEstatistica';
import GraficoBarras from '../components/GraficoBarras';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export default function HealthScreen({ activeScreen, onNavigate }) {
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
    const debounceTimer = useRef(null);

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
        }
    };

    useEffect(() => {
        const buscarMedia = async () => {
            if (!selectedDate) {
                setMediaPorData(null);
                return;
            }
            setLoadingMediaData(true);
            try {
                const resultado = await getMediaPorData(selectedDate);
                setMediaPorData(resultado);
            } catch (error) {
                console.error('Erro ao buscar média por data:', error);
                setMediaPorData(null);
            } finally {
                setLoadingMediaData(false);
            }
        };
        buscarMedia();
    }, [selectedDate]);

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (!valorDigitado) {
            setProbabilidade(null);
            return;
        }

        debounceTimer.current = setTimeout(async () => {
            setLoadingProbabilidade(true);
            try {
                const resultado = await getProbabilidadePorValor(valorDigitado);
                setProbabilidade(resultado);
            } catch (error) {
                console.error('Erro ao buscar probabilidade:', error);
                setProbabilidade(null);
            } finally {
                setLoadingProbabilidade(false);
            }
        }, 800); // 800ms de debounce
    }, [valorDigitado]);

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
                                <Text style={styles.analysisTitle}>Média de batimento Cardíaco por data</Text>
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
                                    <ActivityIndicator color="#F39200" />
                                ) : (
                                    <View style={styles.card}>
                                        {selectedDate === '' ? (
                                            <Text style={styles.statLabel}>Digite uma data válida</Text>
                                        ) : mediaPorData === null ? (
                                            <Text style={styles.statLabel}>Sem dados de batimento para a data selecionada</Text>
                                        ) : (
                                            <>
                                                <Text style={styles.statLabel}>A média do dia é igual a:</Text>
                                                <Text style={styles.largeValue}>{mediaPorData?.toFixed(2)}</Text>
                                            </>
                                        )}
                                    </View>
                                )}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.title}>Probabilidade de Batimento</Text>
                                <Text style={styles.description}>
                                    Digite um valor e descubra a chance de o seu pet apresentar esse batimento cardíaco, com base no histórico real.
                                </Text>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder="Insira o valor"
                                    keyboardType="numeric"
                                    value={valorDigitado}
                                    onChangeText={setValorDigitado}
                                />
                                {valorDigitado !== '' && (
                                    <>
                                        <Text style={styles.dataTitle}>Você digitou:</Text>
                                        <Text style={styles.statValue}>{valorDigitado} BPM</Text>
                                    </>
                                )}
                                {loadingProbabilidade ? (
                                    <ActivityIndicator color="#F39200" />
                                ) : (
                                    <View style={styles.probabilityCard}>
                                        {probabilidade ? (
                                            <>
                                                <Text style={styles.probabilityTitle}>{probabilidade.titulo}</Text>
                                                <Text style={styles.probabilityDescription}>
                                                    A chance do seu pet apresentar {probabilidade.valor_informado} BPM é de {probabilidade.probabilidade_percentual?.toFixed(2)}%.
                                                </Text>
                                                <Text style={styles.probabilityEvaluation}>{probabilidade.avaliacao}</Text>
                                            </>
                                        ) : (
                                            <Text style={styles.statLabel}>Digite um valor para calcular</Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </>
                    )}
                </ScrollView>
                <ExpandableMenu animalId={animalId} />
                <NavigationBar activeScreen={activeScreen} onNavigate={onNavigate} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    heartIcon: {
        position: 'absolute', top: 50, right: 20, opacity: 0.1, zIndex: -1,
    },
    scroll: { paddingHorizontal: 20, paddingBottom: 180 },
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
    },
    dateInput: {
        backgroundColor: '#EEE',
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 16,
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        alignSelf: 'center',
        width: '50%',
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
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FF0000',
        marginVertical: 5,
        marginTop: 40,
        textAlign: 'center',
    },
    dataTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FF0000',
        marginVertical: 5,
        textAlign: 'center',
    },
    probabilityTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 10,
    },
    probabilityDescription: {
        fontSize: 14,
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
        textAlign: 'center',
    },
});
