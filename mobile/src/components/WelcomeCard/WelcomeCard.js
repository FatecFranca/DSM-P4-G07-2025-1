import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Pressable } from 'react-native';

export default function WelcomeCard({ onStart }) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const colorAnim = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
        Animated.timing(colorAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        Animated.timing(colorAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
        }).start(() => {
            onStart();
        });
    };

    const interpolatedColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#F39200', '#c36a00'],
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/imagens/logo-petdex.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.text}>
                Seu pet mais seguro,{"\n"}
                saudável e perto de você.{"\n"}
                Sempre
            </Text>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Animated.View style={[styles.button, { backgroundColor: interpolatedColor }]}>
                        <Text style={styles.buttonText}>Vamos começar?</Text>
                    </Animated.View>
                </Pressable>
            </Animated.View>

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
        bottom: 25,
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
        marginBottom: 35,
        fontFamily: 'Poppins_600SemiBold',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    pata: {
        position: 'absolute',
        bottom: -110,
        right: -40,
        width: 290,
        height: 280,
        opacity: 0.2,
    },
});
