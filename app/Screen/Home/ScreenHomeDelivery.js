import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


const HomeScreenDelivery = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={30} color="#555" />
        </TouchableOpacity>
        <View style={styles.logoCapsule}>
          <Text style={styles.logoText}>FleteandoTe</Text>
        </View>
      </View>
        <View style={styles.separator} />
      <View style={styles.content}>
        <Text></Text>
      </View>





      
        <View style={styles.separator} />
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFC470', 
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  menuButton: {
    marginRight: 15,
  },
    logoCapsule: {
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 50,
      flex: 1,
      justifyContent: 'center',
    },
    logoText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    content: {
      padding: 16,
    },
    separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    },
  });
  
  export default HomeScreenDelivery;