import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function NavItem({ icon, label, isActive, onPress, iconColor }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.iconLabel}>
                <FontAwesomeIcon
                    icon={icon}
                    size={24}
                    color={iconColor || (isActive ? '#F39200' : '#000000')}
                />
                <Text
                    style={[
                        styles.label,
                        { color: iconColor || (isActive ? '#F39200' : '#000000') },
                    ]}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
    },
    iconLabel: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        marginTop: 4,
        fontFamily: 'Poppins_600SemiBold',
    },
});
