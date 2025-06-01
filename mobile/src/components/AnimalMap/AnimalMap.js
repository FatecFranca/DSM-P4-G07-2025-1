import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getLatestLocalizacao } from '../../services/api';

export default function MapaAnimal({ animalId }) {
    const [localizacao, setLocalizacao] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLocalizacao() {
            try {
                const data = await getLatestLocalizacao(animalId);

                /**
                 * ✅ Quando sua API retornar coordenadas válidas (diferentes de 0),
                 * remova o bloco de fallback abaixo e use diretamente os dados reais:
                 * 
                 * if (data && Number(data.latitude) !== 0 && Number(data.longitude) !== 0) {
                 *     setLocalizacao({
                 *         latitude: parseFloat(data.latitude),
                 *         longitude: parseFloat(data.longitude),
                 *     });
                 * } else {
                 *     setError("Localização não disponível");
                 * }
                 */

                // Fallback temporário para testes
                setLocalizacao({
                    latitude: -23.55052,
                    longitude: -46.633308,
                });

            } catch (err) {
                console.error('Erro ao buscar localização:', err);
                setError("Localização não disponível");
            }
        }

        fetchLocalizacao();
    }, [animalId]);

    if (!localizacao) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#F39200" />
                <Text style={styles.loadingText}>Carregando localização...</Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...localizacao,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            <Marker coordinate={localizacao}>
                <View style={styles.marker}>
                    <Image
                        source={require('../../../assets/imagens/uno.png')}
                        style={styles.avatar}
                    />
                </View>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "center",
        color: '#FFFFFF',
        fontFamily: 'Poppins_600SemiBold',
    },
    errorText: {
        marginTop: 10,
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
    },
    marker: {
        borderWidth: 3,
        borderColor: '#F39200',
        borderRadius: 30,
        padding: 2,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
