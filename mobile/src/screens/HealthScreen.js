import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, ScrollView, ActivityIndicator,
    StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity
} from 'react-native';
import {
    getMediaUltimos5Dias,
    getEstatisticasCompletas,
    getMediaPorData,
    getProbabilidadePorValor,
    getRegressao,
    getPredicaoBatimento
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

    // Novos estados para regressão e predição
    const [regressaoData, setRegressaoData] = useState(null);
    const [loadingPredicao, setLoadingPredicao] = useState(false);
    const [predicao, setPredicao] = useState(null);
    const [acelerometro, setAcelerometro] = useState({ x: '', y: '', z: '' });


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [estatisticas, medias, regressao] = await Promise.all([
                    getEstatisticasCompletas(),
                    getMediaUltimos5Dias(),
                    getRegressao() 
                ]);
                if (estatisticas) setHealthData(estatisticas);
                setMediasUltimos5Dias(medias);
                if (regressao) setRegressaoData(regressao);

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

    const handleCalcularPredicao = async () => {
        if (!acelerometro.x || !acelerometro.y || !acelerometro.z) {
            alert('Por favor, preencha os três valores de aceleração (X, Y e Z).');
            return;
        }
        setLoadingPredicao(true);
        setPredicao(null);
        try {
            const resultado = await getPredicaoBatimento(acelerometro.x, acelerometro.y, acelerometro.z);
            setPredicao(resultado);
        } catch (error) {
            console.error('Erro ao buscar predição:', error);
            setPredicao({ error: true });
        } finally {
            setLoadingPredicao(false);
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
                                    <ActivityIndicator color="#F39200" style={{ marginTop: 10 }} />
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
                                    Digite um valor e descubra a chance do seu pet apresentar esse batimento cardíaco com base no histórico real.
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
                                    <ActivityIndicator color="#F39200" style={{ marginTop: 10 }} />
                                ) : (
                                    probabilidade && (
                                        <View style={styles.probabilityCard}>
                                            {probabilidade.error ? (
                                                <Text style={styles.statLabel}>Não foi possível calcular. Tente outro valor.</Text>
                                            ) : (
                                                <>
                                                    <Text style={styles.dataTitleBold}>Probabilidade</Text>
                                                    {
                                                        probabilidade.probabilidade_percentual > 0 &&
                                                        <Text style={styles.probabilityPercent}>
                                                        {probabilidade.probabilidade_percentual?.toFixed(2)}%
                                                    </Text>
                                                    }

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

                            {/* NOVA SEÇÃO DE REGRESSÃO E CORRELAÇÃO */}
                            {regressaoData &&
                                <View style={styles.section}>
                                    <Text style={styles.analysisTitle}>Regressão e Correlação</Text>
                                    <Text style={styles.regressaoDescriptionText}>Análise da relação entre os dados de movimento e a frequência cardíaca do pet</Text>

                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Coeficientes de Regressão</Text>
                                        <View style={styles.statsRow}>
                                            <View style={styles.statItem}>
                                                <Text style={styles.regressaoLabel}>Eixo X</Text>
                                                <Text style={styles.statValue}>{regressaoData.coeficientes?.acelerometroX.toFixed(3)}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.regressaoLabel}>Eixo Y</Text>
                                                <Text style={styles.statValue}>{regressaoData.coeficientes?.acelerometroY.toFixed(3)}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.regressaoLabel}>Eixo Z</Text>
                                                <Text style={styles.statValue}>{regressaoData.coeficientes?.acelerometroZ.toFixed(3)}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Correlações</Text>
                                        <View style={styles.statsRow}>
                                            <View style={styles.statItem}>
                                                <Text style={styles.regressaoLabel}>Eixo X</Text>
                                                <Text style={styles.statValue}>{regressaoData.correlacoes?.acelerometroX.toFixed(3)}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.regressaoLabel}>Eixo Y</Text>
                                                <Text style={styles.statValue}>{regressaoData.correlacoes?.acelerometroY.toFixed(3)}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.regressaoLabel}>Eixo Z</Text>
                                                <Text style={styles.statValue}>{regressaoData.correlacoes?.acelerometroZ.toFixed(3)}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.statsRow}>
                                        <View style={[styles.card, { flex: 1, marginRight: 10 }]}>
                                            <Text style={styles.dataTitle}>Coeficiente Geral</Text>
                                            <Text style={styles.statValue}>{regressaoData.coeficiente_geral?.toFixed(3)}</Text>
                                        </View>
                                        <View style={[styles.card, { flex: 1 }]}>
                                            <Text style={styles.dataTitle}>Coeficiente R²</Text>
                                            <Text style={styles.statValue}>{regressaoData.r2?.toFixed(3)}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.card, { flex: 1 }]}>
                                        <Text style={styles.dataTitle}>Erro Quadrático</Text>
                                        <Text style={styles.statValue}>{regressaoData.media_erro_quadratico?.toFixed(3)}</Text>
                                    </View>

                                    {/* MENSAGEM ADICIONADA AQUI */}
                                    <Text style={styles.description}>
                                        Com base na análise de correlação, observou-se que a frequência cardíaca é afetada exclusivamente pelos valores de aceleração nos eixos X, Y e Z.
                                    </Text>

                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Função de Regressão</Text>
                                        <Text style={styles.formulaText}>{regressaoData.funcao_regressao}</Text>
                                    </View>

                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Fazer previsão de batimento</Text>
                                        <Text style={styles.previsaoBatimentoDescriptionText}>Informe os valores de aceleração em atm</Text>
                                        <View style={styles.predictionInputRow}>
                                            <TextInput
                                                style={styles.predictionInput}
                                                placeholder="X"
                                                keyboardType="numeric"
                                                value={acelerometro.x}
                                                onChangeText={(text) => setAcelerometro(prev => ({ ...prev, x: text }))}
                                            />
                                            <TextInput
                                                style={styles.predictionInput}
                                                placeholder="Y"
                                                keyboardType="numeric"
                                                value={acelerometro.y}
                                                onChangeText={(text) => setAcelerometro(prev => ({ ...prev, y: text }))}
                                            />
                                            <TextInput
                                                style={styles.predictionInput}
                                                placeholder="Z"
                                                keyboardType="numeric"
                                                value={acelerometro.z}
                                                onChangeText={(text) => setAcelerometro(prev => ({ ...prev, z: text }))}
                                            />
                                        </View>

                                        <TouchableOpacity
                                            style={[styles.button, loadingPredicao && styles.buttonDisabled]}
                                            onPress={handleCalcularPredicao}
                                            disabled={loadingPredicao}
                                        >
                                            <Text style={styles.buttonText}>Calcular batimento</Text>
                                        </TouchableOpacity>

                                        {loadingPredicao ? (
                                            <ActivityIndicator color="#F39200" style={{ marginTop: 15 }} />
                                        ) : (
                                            predicao && (
                                                <View style={{ marginTop: 15 }}>
                                                    {predicao.error ? (
                                                        <Text style={styles.statLabel}>Erro ao calcular</Text>
                                                    ) : (
                                                        <>
                                                            <Text style={styles.statLabel}>Batimento previsto:</Text>
                                                            <Text style={styles.largeValue}>{predicao.frequencia_prevista?.toFixed(2)} BPM</Text>
                                                        </>
                                                    )}
                                                </View>
                                            )
                                        )}
                                    </View>
                                </View>
                            }
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
        marginLeft: 16,
        marginTop: 10,
    },
    section: { 
        marginBottom: 20 
    },
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
        paddingVertical: 10,
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
        paddingHorizontal: 26,
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
        fontSize: 22,
        fontFamily: 'Poppins_700Bold',
        color: '#FF0000',
        marginVertical: 5,
        marginTop: 40,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    dataTitleBold: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: '#FF0000',
        marginVertical: 5,
        textAlign: 'center',
    },
    dataTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FF0000',
        marginVertical: 5,
        textAlign: 'center',
    },
    probabilityPercent: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        marginVertical: 5,
    },
    probabilityTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
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


    regressaoLabel: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#666',
        marginBottom: 2,
    },
    formulaText: {
        fontSize: 14,
        fontFamily: 'monospace',
        color: '#333',
        textAlign: 'center',
        marginHorizontal: 10,
        lineHeight: 20,
    },
    predictionInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 15,
    },
    predictionInput: {
        backgroundColor: '#eee',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        width: '30%',
    },
    regressaoDescriptionText: {
        fontFamily: 'Poppins_400Regular',
        textSize: 10,
        marginTop: -8,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    previsaoBatimentoDescriptionText: {
        fontFamily: 'Poppins_400Regular',
        textSize: 10,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20
    }
});