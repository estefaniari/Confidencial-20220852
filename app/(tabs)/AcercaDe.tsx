import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function AcercaDe() {
    const officer = {
        photo: 'https://www.shutterstock.com/image-vector/man-special-agent-black-hat-600nw-2263651189.jpg',
        firstName: 'Juan',
        lastName: 'Pérez',
        badgeNumber: '123456',
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: officer.photo }} style={styles.profileImage} />
                <Text style={styles.name}>{officer.firstName} {officer.lastName}</Text>
                <Text style={styles.badge}>Matrícula: {officer.badgeNumber}</Text>
            </View>
            <Text style={styles.reflection}>
                "La seguridad no es solo una prioridad, es una responsabilidad compartida que fortalece a toda la comunidad."
            </Text>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2C3E50', 
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        color: '#ECF0F1', 
        fontWeight: 'bold',
    },
    badge: {
        fontSize: 16,
        color: '#BDC3C7', 
    },
    reflection: {
        fontSize: 16,
        color: '#ECF0F1', 
        marginVertical: 20,
        textAlign: 'center',
    },
});
