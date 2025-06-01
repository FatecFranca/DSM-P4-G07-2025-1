import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpandableMenu from '../components/ExpandableMenu/ExpandableMenu';
import NavigationBar from '../components/NavigationBar';
import MapaAnimal from '../components/AnimalMap/AnimalMap';

const animalId = '68194120636f719fcd5ee5fd';

export default function HomeScreen({ activeScreen, onNavigate }) {
    return (
        <View style={styles.container}>
            {/* Mapa exibindo localização do animal */}
            <View style={styles.mapContainer}>
                <MapaAnimal animalId={animalId} />
            </View>

            <ExpandableMenu animalId={animalId} />
            <NavigationBar activeScreen={activeScreen} onNavigate={onNavigate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9D9D9C',
        position: 'relative',
    },
    mapContainer: {
        flex: 1,
        zIndex: 0,
    },
});
