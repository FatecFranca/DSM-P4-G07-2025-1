import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getLatestLocalizacao } from '../../services/api';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

export default function CardLocation({ animalId }) {
    const [endereco, setEndereco] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEndereco() {
            try {
                const local = await getLatestLocalizacao(animalId);
                console.log("CARD Location!")
                if (!local || !local.latitude || !local.longitude) {
                    setErro('Coordenadas não encontradas.');
                    setLoading(false);
                    return;
                }
                console.log(local);

                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${local.latitude},${local.longitude}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR`);
                console.log(GOOGLE_MAPS_API_KEY);
                const data = response.data;
                if (data.status === 'OK' && data.results.length > 0) {
                    setEndereco(data.results[0].formatted_address);
                } else {
                    setErro('Endereço não encontrado.');
                }
            } catch (err) {
                console.error('Erro ao buscar endereço do Google Maps:', err);
                setErro('Erro ao buscar endereço.');
            } finally {
                setLoading(false);
            }
        }

        fetchEndereco();
    }, [animalId]);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <FontAwesomeIcon icon={faLocationDot} color="#F39200" size={18} />
                <Text style={styles.title}>UNO ESTÁ EM:</Text>
            </View>

            {loading ? (
                <ActivityIndicator color="#F39200" />
            ) : erro ? (
                <Text style={styles.error}>{erro}</Text>
            ) : (
                <Text style={styles.address}>{endereco}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        display: 'flex',
        top: 20,
        left: 10,
        right: 10,
        backgroundColor: '#EDEDED',
        borderRadius: 12,
        padding: 10,
        zIndex: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 50,
        paddingLeft: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: '#F39200',
        textAlign: 'center'
    },
    address: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center'
    },
    error: {
        fontSize: 12,
        color: '#FF0000',
        fontFamily: 'Poppins_400Regular',
    },
});
