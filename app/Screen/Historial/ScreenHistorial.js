import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


export default function ScreenHistorial({ navigation }) {
  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()} 
        >
          <Ionicons name="menu-outline" size={30} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial</Text>
      </View>

      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>1 Solicitud en total</Text>
        
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('DetalleHistorial')} // Nombre que pusiste en el Stack
        >
          <View style={styles.cardInfo}>
            <Text style={styles.dateText}>4/04/2026</Text>
            <Text style={styles.timeText}>16:11 - 17:13</Text>
            
          </View>
          
          <View style={styles.cardStatus}>
            <Text style={styles.envioText}>1 Envío en Total</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </View>
          
        </TouchableOpacity>

        <View style={styles.separator} />
        <View style={styles.cardInfo}>
          <Text style={styles.dateText}>4/04/2026</Text>
          <Text style={styles.timeText}>16:11 - 17:13</Text>
        </View>
        <View style={styles.cardStatus}>
            <Text style={styles.envioText}>1 Envío en Total</Text>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff', 
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  menuButton: {
    zIndex: 1,
  },
  summaryBar: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    alignItems: 'center',
  },
  summaryText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    color: '#999',
    fontSize: 14,
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  envioText: {
    color: '#ccc',
    marginRight: 10,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 10,
  },
});