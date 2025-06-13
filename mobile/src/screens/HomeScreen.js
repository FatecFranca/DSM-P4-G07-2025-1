import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpandableMenu from '../components/ExpandableMenu/ExpandableMenuSaude';
import NavigationBar from '../components/NavigationBar';
import MapaAnimal from '../components/AnimalMap/AnimalMap';

export default function HomeScreen({ animalId }) {
    return (
        <View style={styles.container}>
            <ExpandableMenu animalId={animalId} />
            <View style={styles.mapContainer}>
                <MapaAnimal animalId={animalId} />
            </View>
            <NavigationBar />
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
