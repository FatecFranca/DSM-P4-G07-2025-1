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
import LocationScreen from './screens/LocationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import IntroScreen from './screens/IntroSreen';
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

    const [activeScreen, setActiveScreen] = useState('welcome');

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
            case 'home':
                return <HomeScreen activeScreen={activeScreen} onNavigate={setActiveScreen} animalId={animalId} />;
            case 'saude':
                return <HealthScreen activeScreen={activeScreen} onNavigate={setActiveScreen} animalId={animalId} />;
            case 'localizacao':
                return <LocationScreen activeScreen={activeScreen} onNavigate={setActiveScreen} animalId={animalId} />;
            case 'intro':
                return <IntroScreen onNavigate={setActiveScreen} animalId={animalId} />;
            case 'welcome':
            default:
                return <WelcomeScreen onNavigate={setActiveScreen} />;
        }
    };

    return (
        <MenuProvider>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar barStyle="dark-content" style="dark" backgroundColor="transparent" translucent={true} />
                {
                    ['localizacao', 'home', 'saude'].includes(activeScreen) && (
                        <View style={styles.overlayContainer} pointerEvents="box-none">
                            <ExpandableMenu animalId={animalId} />
                            <NavigationBar activeScreen={activeScreen} onNavigate={setActiveScreen} />
                        </View>
                    )
                }
                <View style={styles.screenContainer}>
                    {renderScreen()}
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
