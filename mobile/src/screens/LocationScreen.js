// src/screens/LocationScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpandableMenu from '../components/ExpandableMenu/ExpandableMenuSaude';
import NavigationBar from '../components/NavigationBar';
import MapaAnimal from '../components/AnimalMap/AnimalMap';
import CardLocation from '../components/CardLocation/CardLocation';

const animalId = '68194120636f719fcd5ee5fd';

export default function LocationScreen({ activeScreen, onNavigate }) {
    return (
        <View style={styles.container}>
            {/* Card com endereço */}
            <CardLocation animalId={animalId} />

            {/* Mapa com localização */}
            <View style={styles.mapContainer}>
                <MapaAnimal animalId={animalId} />
            </View>

            {/* Menu expansível com informações do animal */}
            <ExpandableMenu animalId={animalId} />

            {/* Barra de navegação inferior */}
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
