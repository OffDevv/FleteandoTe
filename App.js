import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import MyNavigation, { MyStackLogin } from './app/MyNavigation';
import EstadoGlobalUser, { EstadoGlobalContext } from './app/Context/EstadoGlobalUser';
import { PaperProvider } from 'react-native-paper';
<<<<<<< HEAD
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import ScreenHomeUsers from './app/Screen/Home/ScreenHomeUsers';
=======
import 'react-native-gesture-handler';
>>>>>>> origin/master

enableScreens(false);




function MainApp() {
<<<<<<< HEAD
  const { login, authReady } = useContext(EstadoGlobalContext)
  if (!authReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2094FE" />
      </View>
    );
  }

=======
  const { login } = useContext(EstadoGlobalContext)
  console.log(login) // para chequear vamos a obtener el valor del false
>>>>>>> origin/master
  return login ? <MyNavigation /> : <MyStackLogin />
}
export default function App() {
  {/*se envuelve todo para que pueda usar el context*/ }
  return (    
    
    <EstadoGlobalUser>   
      <NavigationContainer>   
        <PaperProvider>
          <MainApp />
        </PaperProvider>
      </NavigationContainer>
    </EstadoGlobalUser>
  );
}
