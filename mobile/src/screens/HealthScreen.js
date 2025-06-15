import React from 'react';
import {
    View, Text, TextInput, ScrollView, ActivityIndicator,
    StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getMediaUltimos5Dias, getEstatisticasCompletas, getMediaPorData, getProbabilidadePorValor, getRegressao, getPredicaoBatimento } from '../services/apiEstatistica';
import GraficoBarras from '../components/GraficoBarras';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

export default function HealthScreen({ animalId }) {
    const [healthData, setHealthData] = React.useState(null);
    const [mediasUltimos5Dias, setMediasUltimos5Dias] = React.useState([]);
    const [mediaPorData, setMediaPorData] = React.useState(null);
    const [valorDigitado, setValorDigitado] = React.useState('');
    const [probabilidade, setProbabilidade] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [loadingMediaData, setLoadingMediaData] = React.useState(false);
    const [loadingProbabilidade, setLoadingProbabilidade] = React.useState(false);
    const [regressaoData, setRegressaoData] = React.useState(null);
    const [loadingPredicao, setLoadingPredicao] = React.useState(false);
    const [predicao, setPredicao] = React.useState(null);
    const [acelerometro, setAcelerometro] = React.useState({ x: '', y: '', z: '' });

    const [date, setDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [selectedDateForDisplay, setSelectedDateForDisplay] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [estatisticas, medias, regressao] = await Promise.all([
                    getEstatisticasCompletas(),
                    getMediaUltimos5Dias(),
                    getRegressao()
                ]);
                if (estatisticas) setHealthData(estatisticas);
                console.log("Estatisticas: ", estatisticas)
                setMediasUltimos5Dias(medias);
                if (regressao) setRegressaoData(regressao);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onChangeDate = async (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (event.type === 'set' && selectedDate) {
            const currentDate = selectedDate || date;
            setDate(currentDate);

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');

            const apiFormattedDate = `${year}-${month}-${day}`;
            const displayFormattedDate = `${day}/${month}/${year}`;

            setSelectedDateForDisplay(displayFormattedDate);
            setLoadingMediaData(true);
            setMediaPorData(null);

            try {
                const resultado = await getMediaPorData(apiFormattedDate);
                if (resultado !== null && resultado !== undefined) {
                    setMediaPorData({ media: resultado });
                } else {
                    setMediaPorData({ noData: true });
                }
            } catch (error) {
                setMediaPorData({ error: true });
            } finally {
                setLoadingMediaData(false);
            }
        }
    };

    const handleCalcularProbabilidade = async () => {
        if (!valorDigitado) return;
        setLoadingProbabilidade(true);
        setProbabilidade(null);
        try {
            const resultado = await getProbabilidadePorValor(valorDigitado);
            setProbabilidade(resultado);
        } catch (error) {
            setProbabilidade({ error: true });
        } finally {
            setLoadingProbabilidade(false);
        }
    };

    const handleCalcularPredicao = async () => {
        if (!acelerometro.x || !acelerometro.y || !acelerometro.z) return;
        setLoadingPredicao(true);
        setPredicao(null);
        try {
            const resultado = await getPredicaoBatimento(acelerometro.x, acelerometro.y, acelerometro.z);
            setPredicao(resultado);
        } catch (error) {
            setPredicao({ error: true });
        } finally {
            setLoadingPredicao(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <FontAwesomeIcon icon={faHeartbeat} size={120} color="#FF0000" style={styles.heartIcon} />
                <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    {loading ? (
                        <ActivityIndicator size="large" color="#F39200" style={{ marginTop: 50 }} />
                    ) : (
                        <>
                            <Text style={styles.title}>Painel de Saúde</Text>
                            <Text style={styles.description}>
                                Frequência cardíaca, padrões de atividade e informações de saúde reunidas em um só lugar. Tenha controle total da saúde do seu pet.
                            </Text>

                            <Text style={styles.analysisTitle}>Média de batimentos dos últimos cinco dias</Text>
                            <GraficoBarras data={mediasUltimos5Dias} />

                            {healthData && (
                                <>
                                    <Text style={styles.analysisTitle}>Análise Estatística da Frequência Cardíaca</Text>
                                    <View style={styles.card}>
                                        <View style={styles.statsRow}>
                                            <View style={styles.statItem}><Text style={styles.statLabel}>Média</Text><Text style={styles.statValue}>{healthData.media?.toFixed(1) || '--'}</Text></View>
                                            <View style={styles.statItem}><Text style={styles.statLabel}>Moda</Text><Text style={styles.statValue}>{healthData.moda?.toFixed(1) || '--'}</Text></View>
                                            <View style={styles.statItem}><Text style={styles.statLabel}>Mediana</Text><Text style={styles.statValue}>{healthData.mediana?.toFixed(1) || '--'}</Text></View>
                                        </View>
                                        <View style={styles.secondaryStats}>
                                            <View style={styles.statItem}>
                                                <Text style={styles.statLabel}>Desvio Padrão</Text>
                                                <Text style={styles.statValue}>{healthData.desvioPadrao?.toFixed(1) || '--'}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.statLabel}>Assimetria</Text>
                                                <Text style={styles.statValue}>{healthData.assimetria?.toFixed(2) || '--'}</Text>
                                            </View>
                                            <View style={styles.statItem}>
                                                <Text style={styles.statLabel}>Curtose</Text>
                                                <Text style={styles.statValue}>{healthData.curtose?.toFixed(2) || '--'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            )}

                            <View style={styles.section}>
                                <Text style={styles.analysisTitle}>Média de Batimento Cardíaco por Data</Text>
                                <Text style={styles.escolhaData}>Escolha uma data</Text>
                                <TouchableOpacity style={styles.inputUnificado} onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.inputText}>{selectedDateForDisplay || 'Clique para selecionar'}</Text>
                                </TouchableOpacity>

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeDate}
                                    />
                                )}

                                {loadingMediaData ? (
                                    <ActivityIndicator color="#F39200" style={{ marginTop: 10 }} />
                                ) : (
                                    mediaPorData && (
                                        <View style={styles.card}>
                                            {mediaPorData.error ? (
                                                <Text style={styles.batimentoNaoEncontradoLabel}>Erro ao buscar dados.</Text>
                                            ) : mediaPorData.noData ? (
                                                <Text style={styles.batimentoNaoEncontradoLabel}>Nenhum batimento encontrado para esta data.</Text>
                                            ) : (
                                                <>
                                                    <Text style={styles.statLabel}>A média do dia é igual a</Text>
                                                    <Text style={styles.largeValue}>{mediaPorData.media?.toFixed(2)}</Text>
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
                                    style={styles.inputUnificado}
                                    placeholder="Insira o valor do batimento"
                                    keyboardType="numeric"
                                    value={valorDigitado}
                                    onChangeText={setValorDigitado}
                                />
                                <TouchableOpacity style={[styles.button, (!valorDigitado || loadingProbabilidade) && styles.buttonDisabled]} onPress={handleCalcularProbabilidade} disabled={!valorDigitado || loadingProbabilidade}>
                                    <Text style={styles.buttonText}>Calcular Probabilidade</Text>
                                </TouchableOpacity>

                                {loadingProbabilidade ? <ActivityIndicator color="#F39200" style={{ marginTop: 10 }} /> : (
                                    probabilidade && (
                                        <View style={styles.probabilityCard}>
                                            {probabilidade.error ? (
                                                <Text style={styles.statLabel}>Não foi possível calcular. Tente outro valor.</Text>
                                            ) : (
                                                <>
                                                    <Text style={styles.dataTitleBold}>Probabilidade</Text>
                                                    {probabilidade.probabilidade_percentual > 0 && <Text style={styles.probabilityPercent}>{probabilidade.probabilidade_percentual?.toFixed(2)}%</Text>}
                                                    <Text style={styles.probabilityTitle}>{probabilidade.titulo}</Text>
                                                    {probabilidade.probabilidade_percentual > 0 && <Text style={styles.probabilityDescription}>A probabilidade do seu pet apresentar {probabilidade.valor_informado} BPM é de {probabilidade.probabilidade_percentual?.toFixed(2)}%.</Text>}
                                                    <Text style={styles.probabilityEvaluation}>{probabilidade.avaliacao}</Text>
                                                </>
                                            )}
                                        </View>
                                    )
                                )}
                            </View>

                            {regressaoData &&
                                <View style={styles.section}>
                                    <Text style={styles.analysisTitle}>Regressão e Correlação</Text>
                                    <Text style={styles.regressaoDescriptionText}>Análise da relação entre os dados de aceleração e a frequência cardíaca do pet</Text>
                                    <Text style={styles.description}>Com base na análise de correlação, observou-se que a frequência cardíaca é afetada exclusivamente pelos valores de aceleração nos eixos X, Y e Z, tendo sido descartado o uso dos valores do giroscópio.</Text>
                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Coeficientes de Regressão</Text>
                                        <Text style={styles.regressaoLabel}>Dados de Aceleração</Text>
                                        <View style={styles.statsRow}>
                                            <View style={styles.statItem}><Text style={styles.regressaoLabel}>Eixo X</Text><Text style={styles.statValue}>{regressaoData.coeficientes?.acelerometroX.toFixed(3)}</Text></View>
                                            <View style={styles.statItem}><Text style={styles.regressaoLabel}>Eixo Y</Text><Text style={styles.statValue}>{regressaoData.coeficientes?.acelerometroY.toFixed(3)}</Text></View>
                                            <View style={styles.statItem}><Text style={styles.regressaoLabel}>Eixo Z</Text><Text style={styles.statValue}>{regressaoData.coeficientes?.acelerometroZ.toFixed(3)}</Text></View>
                                        </View>
                                    </View>
                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Correlações</Text>
                                        <Text style={styles.regressaoLabel}>Dados de Aceleração</Text>
                                        <View style={styles.statsRow}>
                                            <View style={styles.statItem}><Text style={styles.regressaoLabel}>Eixo X</Text><Text style={styles.statValue}>{regressaoData.correlacoes?.acelerometroX.toFixed(3)}</Text></View>
                                            <View style={styles.statItem}><Text style={styles.regressaoLabel}>Eixo Y</Text><Text style={styles.statValue}>{regressaoData.correlacoes?.acelerometroY.toFixed(3)}</Text></View>
                                            <View style={styles.statItem}><Text style={styles.regressaoLabel}>Eixo Z</Text><Text style={styles.statValue}>{regressaoData.correlacoes?.acelerometroZ.toFixed(3)}</Text></View>
                                        </View>
                                    </View>
                                    <View style={styles.statsRow}>
                                        <View style={[styles.card, { flex: 1, marginRight: 10 }]}><Text style={styles.dataTitle}>Coeficiente Geral</Text><Text style={styles.statValue}>{regressaoData.coeficiente_geral?.toFixed(3)}</Text></View>
                                        <View style={[styles.card, { flex: 1, alignContent: 'center', justifyContent: 'center', display: 'flex' }]}><Text style={styles.dataTitle}>Coeficiente R²</Text><Text style={styles.statValue}>{regressaoData.r2?.toFixed(3)}</Text></View>
                                    </View>
                                    <View style={[styles.card, { flex: 1 }]}><Text style={styles.dataTitle}>Erro Quadrático</Text><Text style={styles.statValue}>{regressaoData.media_erro_quadratico?.toFixed(3)}</Text></View>
                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Função de Regressão</Text>
                                        <Text style={styles.formulaText}>{regressaoData.funcao_regressao}</Text>
                                    </View>
                                    <View style={styles.card}>
                                        <Text style={styles.dataTitle}>Fazer previsão de batimento</Text>
                                        <Text style={styles.previsaoBatimentoDescriptionText}>Informe os valores de aceleração em ATM.</Text>
                                        <View style={styles.predictionInputRow}>
                                            <TextInput style={styles.predictionInput} placeholder="X" keyboardType="numbers-and-punctuation" value={acelerometro.x} onChangeText={(text) => setAcelerometro(prev => ({ ...prev, x: text }))} />
                                            <TextInput style={styles.predictionInput} placeholder="Y" keyboardType="numbers-and-punctuation" value={acelerometro.y} onChangeText={(text) => setAcelerometro(prev => ({ ...prev, y: text }))} />
                                            <TextInput style={styles.predictionInput} placeholder="Z" keyboardType="numbers-and-punctuation" value={acelerometro.z} onChangeText={(text) => setAcelerometro(prev => ({ ...prev, z: text }))} />
                                        </View>
                                        <TouchableOpacity style={[styles.button, loadingPredicao && styles.buttonDisabled]} onPress={handleCalcularPredicao} disabled={loadingPredicao}>
                                            <Text style={styles.buttonText}>Calcular batimento</Text>
                                        </TouchableOpacity>
                                        {loadingPredicao ? <ActivityIndicator color="#F39200" style={{ marginTop: 15 }} /> : (
                                            predicao && (
                                                <View style={{ marginTop: 15 }}>
                                                    {predicao.error ? <Text style={styles.statLabel}>Erro ao calcular</Text> : (
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
    heartIcon: { position: 'absolute', top: 50, right: 20, opacity: 0.1, zIndex: -1 },
    scroll: { paddingHorizontal: 20 },
    scrollContent: { paddingTop: 40, paddingBottom: 250 },
    title: { fontSize: 24, fontFamily: 'Poppins_700Bold', color: '#FF0000', textAlign: 'center', marginBottom: 5, marginTop: 25 },
    description: { fontFamily: 'Poppins_400Regular', textAlign: 'center', marginBottom: 10, color: '#333', fontSize: 12, marginRight: 16, marginLeft: 16, marginTop: 10 },
    section: { marginBottom: 20 },
    card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginVertical: 10, elevation: 2, alignItems: 'center' },
    probabilityCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginVertical: 10, elevation: 2, alignItems: 'center' },
    inputUnificado: {
        width: '80%',
        paddingVertical: 12,
        backgroundColor: '#EEE',
        borderRadius: 25,
        marginVertical: 10,
        alignSelf: 'center',
        paddingHorizontal: 16,
        textAlign: 'center'
    },
    inputText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#333',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#F39200',
        borderRadius: 25,
        paddingVertical: 12,
        alignSelf: 'center',
        marginTop: 5,
        elevation: 2,
        width: '80%',
    },
    buttonDisabled: { backgroundColor: '#CCCCCC' },
    buttonText: { color: '#FFFFFF', fontFamily: 'Poppins_600SemiBold', fontSize: 14, textAlign: 'center' },
    statValue: { fontSize: 18, fontFamily: 'Poppins_700Bold', color: '#000', textAlign: 'center' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, width: '100%' },
    statItem: { flex: 1, alignItems: 'center', display: 'flex', justifyContent: 'center' },
    statLabel: { fontSize: 18, fontFamily: 'Poppins_600SemiBold', color: '#FF0000', marginBottom: 4, textAlign: 'center' },
    batimentoNaoEncontradoLabel: { fontSize: 16, fontFamily: 'Poppins_400Regular', color: '#000', marginBottom: 4, textAlign: 'center', paddingHorizontal: 40 },
    largeValue: { fontSize: 24, fontFamily: 'Poppins_700Bold', color: '#000', textAlign: 'center', marginVertical: 5 },
    secondaryStats: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 12, width: '100%' },
    secondaryStat: { fontSize: 16, fontFamily: 'Poppins_600SemiBold', color: '#FF0000', display: 'flex', flexDirection: 'column' },
    secondaryStatValue: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: '#000' },
    analysisTitle: { fontSize: 22, fontFamily: 'Poppins_700Bold', color: '#FF0000', marginVertical: 5, marginTop: 40, textAlign: 'center', marginRight: 20, marginLeft: 20 },
    dataTitleBold: { fontSize: 20, fontFamily: 'Poppins_700Bold', color: '#FF0000', marginVertical: 5, textAlign: 'center' },
    dataTitle: { fontSize: 20, fontFamily: 'Poppins_600SemiBold', color: '#FF0000', marginVertical: 5, textAlign: 'center' },
    escolhaData: { fontSize: 16, fontFamily: 'Poppins_400Regular', color: '#000', marginVertical: 5, textAlign: 'center' },
    probabilityPercent: { fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#000', textAlign: 'center', marginVertical: 5 },
    probabilityTitle: { fontSize: 20, fontFamily: 'Poppins_600SemiBold', color: '#FF0000', textAlign: 'center', marginBottom: 10 },
    probabilityDescription: { fontSize: 16, fontFamily: 'Poppins_400Regular', textAlign: 'center', color: '#000', marginBottom: 10, paddingHorizontal: 30 },
    probabilityEvaluation: { fontSize: 15, fontFamily: 'Poppins_400Regular', color: '#000', marginTop: 10, textAlign: 'justify', marginRight: 8, marginLeft: 8 },
    regressaoLabel: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: '#666', marginBottom: 2 },
    formulaText: { fontSize: 14, fontFamily: 'monospace', color: '#333', textAlign: 'center', marginHorizontal: 10, lineHeight: 20 },
    predictionInputRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, width: '100%', marginVertical: 15 },
    predictionInput: { backgroundColor: '#eee', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 10, textAlign: 'center', fontSize: 16, width: '24%' },
    regressaoDescriptionText: { fontFamily: 'Poppins_400Regular', fontSize: 12, marginTop: -8, textAlign: 'center', marginRight: 20, marginLeft: 20, color: '#333' },
    previsaoBatimentoDescriptionText: { fontFamily: 'Poppins_400Regular', fontSize: 12, textAlign: 'center', marginRight: 20, marginLeft: 20, color: '#333' }
});