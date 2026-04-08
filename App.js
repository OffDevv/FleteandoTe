import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import MyNavigation from './app/MyNavigation';

enableScreens(false);

export default function App() {
  return (
    <NavigationContainer>
      <MyNavigation />
    </NavigationContainer>
  );
}
