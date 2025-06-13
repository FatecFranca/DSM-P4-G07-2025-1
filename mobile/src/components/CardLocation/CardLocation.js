import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getLatestLocalizacao } from '../../services/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDA4tZl0tpeoXfMnDEbSQEke2QRgiB894Q';

export default function CardLocation({ animalId }) {
    const [endereco, setEndereco] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEndereco() {
            try {
                const local = await getLatestLocalizacao(animalId);

                if (!local || !local.latitude || !local.longitude) {
                    setErro('Coordenadas não encontradas.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${local.latitude},${local.longitude}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR`);
                const data = await response.json();

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
        top: 20,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        padding: 10,
        zIndex: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 5,
    },
    title: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#F39200',
    },
    address: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Poppins_400Regular',
    },
    error: {
        fontSize: 12,
        color: '#FF0000',
        fontFamily: 'Poppins_400Regular',
    },
});
