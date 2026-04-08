import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenLogin from './app/Screen/login/ScreenLogin';

export default function App() {
  return (
    <View style={{flex:1}}>
      <ScreenLogin/>
    </View>
  );
}

const styles = StyleSheet.create({
  /*
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFC067',
  },

*/
});
