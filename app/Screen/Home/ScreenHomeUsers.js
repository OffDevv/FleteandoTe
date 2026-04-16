import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Saludo from '../../Components/Saludo';
import { EstadoGlobalContext } from '../../Context/EstadoGlobalUser';
export default function ScreenHomeUsers() {
  const {usuario} = useContext(EstadoGlobalContext)
  const navigation = useNavigation();

  const irAlMapa = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Mapa');
      return;
    }
    navigation.navigate('Mapa');
  };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.text}></Text>
      </View>
      <View style={styles.separator} />
   
    <Image source={require('../../Assets/Imagen1.png')} style={{ width: '100%', height: 300, marginTop: 20 }} />

    <TouchableOpacity style={styles.routeButton} onPress={irAlMapa}>
      <Text style={styles.routeButtonText}>Selecciona el parametro de tu ruta</Text>
    </TouchableOpacity>
    <View style={styles.separator} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header : {
    height: 60,
    paddingTop: 20, 
    paddingHorizontal: 15,
    alignItems: 'center',
      flexDirection: 'row',
  },
  menuButton: {
    marginRight: 10,


  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ececec',
    width: '88%',
    alignSelf: 'center',
    marginVertical: 14,
    borderRadius: 999,
  },

  routeButton: {
    margin: 20,
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  routeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
