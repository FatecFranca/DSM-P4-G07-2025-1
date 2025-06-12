import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapaAnimal from '../components/AnimalMap/AnimalMap';

export default function HomeScreen({ animalId }) {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapaAnimal animalId={animalId} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9D9D9C',
    },
    mapContainer: {
        flex: 1,
    },
});