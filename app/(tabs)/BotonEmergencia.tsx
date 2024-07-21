import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BotonEmergencia() {

  const handleSecurityFunction = async () => {

    await AsyncStorage.removeItem('@events');
    
    Alert.alert('Función de Seguridad', 'Todos los registros han sido borrados.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seguridad</Text>
      <TouchableOpacity style={styles.button} onPress={handleSecurityFunction}>
        <Text style={styles.buttonText}>Borrar Todos los Registros</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ECF0F1',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ECF0F1',
    fontWeight: 'bold',
  },
});
