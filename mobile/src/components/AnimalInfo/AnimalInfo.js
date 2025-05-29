import React, { useEffect, useState } from 'react';
import {View,Text,Image, StyleSheet, ActivityIndicator,} from 'react-native';
import { getAnimalInfo } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

export default function AnimalInfo({ animalId }) {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnimal() {
            try {
                const data = await getAnimalInfo(animalId);
                setAnimal(data);
            } catch (error) {
                console.error('Erro ao buscar animal:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchAnimal();
    }, [animalId]);

    if (loading) {
        return <ActivityIndicator size="small" color="#F39200" />;
    }

    if (!animal) {
        return <Text style={styles.errorText}>Erro ao carregar informações.</Text>;
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: animal.avatar || 'https://via.placeholder.com/100' }}
                style={styles.avatar}
            />
            <View style={styles.info}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{animal.nome}</Text>
                    <FontAwesomeIcon
                        icon={animal.sexo === 'M' ? faMars : faVenus}
                        size={13}
                        color={animal.sexo === 'M' ? '#007AFF' : '#FF2D55'}
                        style={styles.icon}
                    />
                </View>
                <Text style={styles.detail}>Sexo: {animal.sexo}</Text>
                <Text style={styles.detail}>Espécie: {animal.especieNome}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ccc',
    },
    info: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    name: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
    },
    icon: {
        marginTop: -9, 
    },
    detail: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 2,
    },
    errorText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: 'red',
    },
});
