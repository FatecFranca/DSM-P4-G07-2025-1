// App.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [activeScreen, setActiveScreen] = useState('welcome');

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!appIsReady) return null;

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />;
      case 'saude':
        return <HealthScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />;
      case 'localizacao':
        return <LocationScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />;
      case 'intro':
        return <IntroScreen onNavigate={setActiveScreen} />;
      case 'welcome':
      default:
        return <WelcomeScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
