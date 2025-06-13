import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getAnimalInfo } from '../services/api';

const { height } = Dimensions.get('window');

export default function IntroScreen({ onNavigate, animalId }) {
    const [animalInfo, setAnimalInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await getAnimalInfo(animalId);
                setAnimalInfo(info);
            } catch (error) {
                console.error('Erro ao buscar dados do animal:', error);
            }
        };
        fetchData();
    }, []);

    function calcularIdade(dataNascimentoString) {
        if (!dataNascimentoString) return null;
        const nascimento = new Date(dataNascimentoString);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    return (
        <View style={styles.container}>
            {/* Imagens decorativas no topo */}
            <Image
                source={require('../../assets/imagens/gato-dex.png')}
                style={styles.gato}
                resizeMode="contain"
            />
            <Image
                source={require('../../assets/imagens/cao-dex.png')}
                style={styles.cao}
                resizeMode="contain"
            />

            {/* Logo */}
            <Image
                source={require('../../assets/imagens/logo-petdex.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Boas-vindas à PetDex!</Text>

            <Text style={styles.subtitle}>
                Nesta plataforma, você poderá visualizar em tempo real os dados da coleira inteligente do
                seu pet, incluindo localização, frequência cardíaca e outras informações vitais.
            </Text>

            <View style={styles.card}>
                <Image
                    source={require('../../assets/imagens/uno.png')}
                    style={styles.avatar}
                    resizeMode="cover"
                />
                <View style={styles.info}>
                    <View style={styles.row}>
                        <Text style={styles.name}>
                            {animalInfo?.nome || <ActivityIndicator size="small" color="#F39200" />}
                        </Text>
                        {animalInfo?.sexo === 'M' ? (
                            <FontAwesome5 name="mars" size={20} color="#0092FF" />
                        ) : animalInfo?.sexo === 'F' ? (
                            <FontAwesome5 name="venus" size={20} color="#FF77A5" />
                        ) : (
                            <ActivityIndicator size="small" color="#F39200" />
                        )}
                    </View>
                    <Text style={styles.raca}>{animalInfo?.racaNome || 'Carregando...'}</Text>
                    <View style={styles.row}>
                        <Text style={styles.detail}>
                            {animalInfo?.dataNascimento ? `${calcularIdade(animalInfo.dataNascimento)} anos` : '-'}
                        </Text>
                        <Text style={styles.detail}>{animalInfo?.peso ? `${animalInfo.peso} kg` : '-'}</Text>
                        <Text style={styles.detail}>Porte Grande</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.contexto}>
                Para esta demonstração, vamos acompanhar o nosso companheiro de testes: Uno, um pet muito
                especial que representa todos os animais que queremos proteger.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => onNavigate('home')}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>

            {/* Pata decorativa */}
            <Image
                source={require('../../assets/imagens/pata-dex.png')}
                style={styles.pata}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    logo: {
        width: 130,
        height: 100,
        marginBottom: 10,
        zIndex: 1,
    },
    title: {
        fontSize: 30,
        color: '#F39200',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Poppins_700Bold',
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        color: '#444',
        fontFamily: 'Poppins_400Regular',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#EDEDED',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#F39200',
        backgroundColor: '#ccc',
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 0,
    },
    name: {
        fontSize: 28,
        color: '#000',
        marginRight: 2,
        fontFamily: 'Poppins_700Bold',
    },
    raca: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Poppins_400Regular',
        marginTop: -8
    },
    detail: {
        fontSize: 12,
        marginRight: 10,
        color: '#000',
        fontFamily: 'Poppins_400Regular',
    },
    contexto: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#444',
        fontFamily: 'Poppins_400Regular',
    },
    button: {
        backgroundColor: '#F39200',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    gato: {
        position: 'absolute',
        top: 53,
        left: 20,
        width: 102,
        height: 122,
        opacity: 0.2,
        zIndex: 0,
    },
    cao: {
        position: 'absolute',
        top: 97,
        right: 15,
        width: 120,
        height: 120,
        opacity: 0.2,
        zIndex: 0,
    },
    pata: {
        position: 'absolute',
        bottom: -50,
        left: -20,
        width: 160,
        height: 160,
        opacity: 0.15,
    },
});
