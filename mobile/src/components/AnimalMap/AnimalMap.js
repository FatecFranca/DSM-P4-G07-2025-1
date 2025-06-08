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

                if (data && Number(data.latitude) !== 0 && Number(data.longitude) !== 0) {
                    setLocalizacao({
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                    });
                } else {
                    setLocalizacao({
                        latitude: -23.55052,
                        longitude: -46.633308,
                    });
                }

            } catch (err) {
                console.error('Erro ao buscar localização:', err);
                setLocalizacao({
                    latitude: -23.55052,
                    longitude: -46.633308,
                });
            }
        }

        fetchLocalizacao();
    }, [animalId]);

    if (!localizacao) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#F39200" />
                <Text style={styles.loadingText}>Carregando localização...</Text>
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
            <Marker
                coordinate={localizacao}
                anchor={{ x: 0.5, y: 0.5 }}
            >
                <View style={styles.markerContainer}>
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
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#F39200',
        backgroundColor: '#ccc',
    },
});