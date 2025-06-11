import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faHouseChimney,
    faMapMarkerAlt,
    faHeartPulse,
    faCog,
} from '@fortawesome/free-solid-svg-icons';
import NavItem from '../NavItem/NavItem';

export default function NavigationBar({ activeScreen, onNavigate }) {
    const getIconColor = (screen) => {
        if (activeScreen === screen) {
            if (screen === 'home') return '#F39200';
            if (screen === 'saude') return '#FF0000';
        }
        return '#000000';
    };

    return (
        <View style={styles.container}>
            <NavItem
                icon={faHouseChimney}
                label="Tela Inicial"
                isActive={activeScreen === 'home'}
                iconColor={getIconColor('home')}
                onPress={() => onNavigate('home')}
            />
            <NavItem
                icon={faMapMarkerAlt}
                label="Localização"
                isActive={activeScreen === 'localizacao'}
                iconColor={getIconColor('localizacao')}
                onPress={() => onNavigate('localizacao')}
            />
            <NavItem
                icon={faHeartPulse}
                label="Saúde"
                isActive={activeScreen === 'saude'}
                iconColor={getIconColor('saude')}
                onPress={() => onNavigate('saude')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
