//import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
//import { StyleSheet, Text, View } from 'react-native';
// import MiprimerComponente from './app/components/MiprimerComponente';

import { NavigationContainer } from '@react-navigation/native';
import MyNavigation from './app/MyNavigation';
import { enableScreens } from 'react-native-screens';
import ScreenHomeDelivery from './app/Screen/Home/ScreenHomeDelivery';


enableScreens(false); //Desactiva react natuive screens


export default function App() {
  return (
  
     
        <NavigationContainer>
          <MyNavigation/>
        </NavigationContainer>
      
  
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
