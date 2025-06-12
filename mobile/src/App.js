import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { MenuProvider } from './context/MenuContext.js';
import {
    useFonts,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './screens/HomeScreen';
import HealthScreen from './screens/HealthScreen';
import ExpandableMenu from './components/ExpandableMenu/ExpandableMenuSaude.js';
import NavigationBar from './components/NavigationBar/index.js';

const animalId = '68194120636f719fcd5ee5fd';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const [activeScreen, setActiveScreen] = useState('home');

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const renderScreen = () => {
        switch (activeScreen) {
            case 'saude':
                return <HealthScreen animalId={animalId} />;
            case 'home':
            default:
                return <HomeScreen animalId={animalId} />;
        }
    };

    return (
        <MenuProvider>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.screenContainer}>
                    {renderScreen()}
                </View>

                <View style={styles.overlayContainer} pointerEvents="box-none">

                    <ExpandableMenu animalId={animalId} />
                    <NavigationBar activeScreen={activeScreen} onNavigate={setActiveScreen} />
                </View>
            </View>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    screenContainer: {
        flex: 1,
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1, 
    },
});