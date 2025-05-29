import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faChevronUp,
    faChevronDown,
    faHeartPulse,
    faCircle,
    faBatteryFull,
    faBatteryThreeQuarters,
    faBatteryHalf,
    faBatteryQuarter,
    faBatteryEmpty,
    faMars,
    faVenus,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';

export default function ExpandableMenu() {
    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(180)).current;

    const toggleExpand = () => {
        Animated.timing(animatedHeight, {
            toValue: expanded ? 180 : 400,
            duration: 250,
            useNativeDriver: false,
        }).start(() => setExpanded(!expanded));
    };

    const animal = { nome: 'Uno', sexo: 'M' };
    const bpm = 100;
    const battery = 20;
    const isConnected = true;

    const getBatteryColor = () => {
        if (battery > 50) return '#04CF04';
        if (battery > 20) return '#FFD700';
        return '#FF0000';
    };

    const getBatteryIcon = () => {
        if (battery > 75) return faBatteryFull;
        if (battery > 50) return faBatteryThreeQuarters;
        if (battery > 25) return faBatteryHalf;
        if (battery > 5) return faBatteryQuarter;
        return faBatteryEmpty;
    };

    return (
        <Animated.View style={[styles.container, { height: animatedHeight }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowButton} onPress={toggleExpand}>
                    <FontAwesomeIcon
                        icon={expanded ? faChevronDown : faChevronUp}
                        size={37}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Logo style={styles.logo} />
            </View>

            <View style={styles.content}>
                <View style={styles.rowTop}>
                    <Image
                        source={require('../../../assets/imagens/uno.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.infoBlock}>
                        <View style={styles.nameAndBpm}>
                            <View style={styles.nameRow}>
                                <Text style={styles.name}>{animal.nome}</Text>
                                <FontAwesomeIcon
                                    icon={animal.sexo === 'M' ? faMars : faVenus}
                                    size={16}
                                    color={animal.sexo === 'M' ? '#007AFF' : '#FF2D55'}
                                    style={styles.genderIcon}
                                />
                            </View>
                            <View style={styles.bpmRow}>
                                <Text style={styles.bpmText}>{bpm}</Text>
                                <FontAwesomeIcon
                                    icon={faHeartPulse}
                                    size={20}
                                    color="#FF0000"
                                    style={{ marginLeft: 4 }}
                                />
                                <Text style={styles.bpmLabel}>BPM</Text>
                            </View>
                        </View>

                        <View style={styles.batteryRow}>
                            <FontAwesomeIcon
                                icon={getBatteryIcon()}
                                size={20}
                                color={getBatteryColor()}
                                style={{ transform: [{ rotate: '-90deg' }] }}
                            />
                            <Text style={[styles.batteryLabel, { color: '#000' }]}>
                                {battery}%
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.statusCenter}>
                    <Text style={styles.statusLabel}>
                        Status da PetDex: {isConnected ? 'Conectada' : 'Desconectada'}
                    </Text>
                    <FontAwesomeIcon
                        icon={faCircle}
                        size={10}
                        color={isConnected ? '#04CF04' : '#FF0000'}
                        style={{ marginLeft: 6 }}
                    />
                </View>

                {expanded && <View style={styles.separator} />}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        backgroundColor: '#EDEDED',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        overflow: 'hidden',
    },
    header: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 10,
    },
    arrowButton: {
        backgroundColor: '#F39200',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 32,
        minWidth: 140,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    logo: {
        position: 'absolute',
        right: -20,
        top: 0,
        width: 100,
        height: 40,
    },
    content: {
        paddingTop: 50,
        gap: 20,
        flex: 1,
    },
    rowTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#F39200',
        backgroundColor: '#ccc',
        marginRight: 12,
    },
    infoBlock: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 8,
    },
    nameAndBpm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    name: {
        fontSize: 40,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000',
    },
    genderIcon: {
        marginTop: -2,
    },
    bpmRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bpmText: {
        fontSize: 40,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000',
    },
    bpmLabel: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 4,
        color: '#000',
    },
    batteryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 1,
        marginTop: -10,
        marginBottom: 4,
    },
    batteryLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#000',
    },
    statusCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -38,
    },
    statusLabel: {
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
        color: '#000',
    },
    separator: {
        height: 1,
        backgroundColor: '#C4C4C4',
        marginTop: -10,
        marginHorizontal: -1,
        borderRadius: 2,
    },
});
