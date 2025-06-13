import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeCard from '../components/WelcomeCard/WelcomeCard';

export default function WelcomeScreen({ onNavigate }) {
    return (
        <View style={styles.screen}>
            <WelcomeCard onStart={() => onNavigate('intro')} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
