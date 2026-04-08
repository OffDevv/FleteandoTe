import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenRegisterTransportista from './app/Screen/login/ScreenRegisterTransportista';
import ScreenRegisterUser from './app/Screen/login/ScreenRegisterUser';



export default function App() {
  return (
    <View style={{flex:1}}>
      <ScreenRegisterUser/>
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
