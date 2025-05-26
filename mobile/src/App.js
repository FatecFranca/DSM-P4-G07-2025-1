import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
    const [activeScreen, setActiveScreen] = useState('home');

    return (
        <View style={styles.container}>
            {activeScreen === 'home' && (
                <HomeScreen
                    activeScreen={activeScreen}
                    onNavigate={setActiveScreen}
                />
            )}
            {/* No futuro: adicionar outras telas aqui */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
