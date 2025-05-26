import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo({ style }) {
    return (
        <Image
            source={require('../../../assets/imagens/logo-petdex.png')}
            style={[styles.logo, style]}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 40,
    },
});
