import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ExpandableMenu from '../components/ExpandableMenu/ExpandableMenu';
import NavigationBar from '../components/NavigationBar';

export default function HomeScreen({ activeScreen, onNavigate }) {
    return (
        <View style={styles.container}>
            <View style={styles.mapBackground}>
                <Text style={styles.mapText}>🗺️ Mapa (GPS)</Text>
            </View>

            <ExpandableMenu />
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
    mapBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
    },
});
