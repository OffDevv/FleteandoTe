import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import MyNavigation, { MyStackLogin } from './app/MyNavigation';
import EstadoGlobalUser, { EstadoGlobalContext } from './app/Context/EstadoGlobalUser';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';

enableScreens(false);




function MainApp() {
  const { login } = useContext(EstadoGlobalContext)
  console.log(login) // para chequear vamos a obtener el valor del false
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
