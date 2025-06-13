import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeCard({ onStart }) {
    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../../../assets/imagens/logo-petdex.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Texto de boas-vindas */}
            <Text style={styles.text}>
                Seu pet mais seguro,{"\n"}
                saudável e perto de{"\n"}
                você. Sempre.
            </Text>

            {/* Botão */}
            <TouchableOpacity style={styles.button} onPress={onStart}>
                <Text style={styles.buttonText}>Vamos começar?</Text>
            </TouchableOpacity>

            {/* Imagem decorativa de pata */}
            <Image
                source={require('../../../assets/imagens/pata-dex.png')}
                style={styles.pata}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'relative',
    },
    logo: {
        width: 280,
        height: 160,
        marginBottom: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        lineHeight: 30,
        marginBottom: 40,
        fontFamily: 'Poppins_600SemiBold',
    },
    button: {
        backgroundColor: '#F39200',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    pata: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 120,
        height: 120,
        opacity: 0.2,
    },
});
