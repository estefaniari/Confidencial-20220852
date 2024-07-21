import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: string | null;
  audio: string | null;
}

export default function HomeScreen() {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    const fetchEvents = async () => {
      const storedEvents = await AsyncStorage.getItem('@events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    };
    fetchEvents(); 
  }, []);

  const saveEvent = async () => {
    const newEvent = {
      id: Math.random().toString(),
      date,
      title,
      description,
      photo,
      audio,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    await AsyncStorage.setItem('@events', JSON.stringify(updatedEvents));
    setDate('');
    setTitle('');
    setDescription('');
    setPhoto(null);
    setAudio(null);
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri ?? null); 
      }
    });
  };

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('recording', e);
      return;
    });
    setAudio(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setAudio(result);
  };

  const onStartPlay = async (audioUri: string) => {
    await audioRecorderPlayer.startPlayer(audioUri);
  };

  return (
    <View style={styles.container}>
      {selectedEvent ? (
        <View>
          <Text style={styles.header}>{selectedEvent.title}</Text>
          <Text>{selectedEvent.date}</Text>
          <Text>{selectedEvent.description}</Text>
          {selectedEvent.photo && <Image source={{ uri: selectedEvent.photo }} style={styles.image} />}
          {selectedEvent.audio && (
          <TouchableOpacity style={styles.button} onPress={() => onStartPlay(selectedEvent.audio as string)}>
           <Text style={styles.buttonText}>Reproducir Audio</Text>
          </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => setSelectedEvent(null)}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.header}>Registrar Incidencia</Text>
          <TextInput
            style={styles.input}
            placeholder="Fecha"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Seleccionar Foto</Text>
          </TouchableOpacity>
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
          
          <TouchableOpacity style={styles.button} onPress={onStartRecord}>
            <Text style={styles.buttonText}>Grabar Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onStopRecord}>
            <Text style={styles.buttonText}>Detener Grabación</Text>
          </TouchableOpacity>
          {audio && <Text>Audio Grabado</Text>}
          
          <TouchableOpacity style={styles.button} onPress={saveEvent}>
            <Text style={styles.buttonText}>Guardar Incidencia</Text>
          </TouchableOpacity>

          <Text style={styles.header}>Incidencias Registradas</Text>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.eventItem}
                onPress={() => setSelectedEvent(item)}
              >
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text>{item.date}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2C3E50', 
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#ECF0F1', 
    },

    input: {
        borderWidth: 1,
        borderColor: '#95A5A6',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#34495E', 
        color: '#ECF0F1', 
    },

    button: {
        backgroundColor: '#2C2C2C', 
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: '#ECF0F1', 
        fontWeight: 'bold',
    },

    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 10,
    },

    eventItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#95A5A6', 
        backgroundColor: '#34495E', 
        marginVertical: 5,
        borderRadius: 10,
    },

    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ECF0F1', 
    }
});


