import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './screens/HomeScreen';
import HealthScreen from './screens/HealthScreen'; 

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');

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
      case 'saude':
        return <HealthScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />;
      case 'home':
      default:
        return <HomeScreen activeScreen={activeScreen} onNavigate={setActiveScreen} />;
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
