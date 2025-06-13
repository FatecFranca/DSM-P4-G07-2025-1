
import { View, StyleSheet } from 'react-native';
import MapaAnimal from '../components/AnimalMap/AnimalMap';
import CardLocation from '../components/CardLocation/CardLocation';

export default function LocationScreen({ activeScreen, onNavigate, animalId}) {
    return (
        <View style={styles.container}>
            {/* Card com endereço */}
            <CardLocation animalId={animalId} />

            {/* Mapa com localização */}
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
        position: 'relative',
    },
    mapContainer: {
        flex: 1,
        zIndex: 0,
    },
});
