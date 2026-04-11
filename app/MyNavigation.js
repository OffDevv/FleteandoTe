
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

//añadimiento de las diferentes pantallas
import ScreenLogin from './Screen/login/ScreenLogin';
import ScreenHomeUsers from './Screen/Home/ScreenHomeUsers';
import ScreenHomeDelivery from './Screen/Home/ScreenHomeDelivery';
import ScreenTransportes from './Screen/Transportes/ScreenTransportes';
import ScreenHistorial from './Screen/Historial/ScreenHistorial';
import ScreenRegisterUser from './Screen/login/ScreenRegisterUser';
import ScreenRegisterTransportista from './Screen/login/ScreenRegisterTransportista';
import ScreenDetalleHistorial from './Screen/Detalles/ScreenDetallesHistorial';
import { EstadoGlobalContext } from './Context/EstadoGlobalUser';
import ScreenSettings from './Screen/Setting/ScreenSettings';


const HistorialStack = createStackNavigator();
function HistorialStackScreen() {
  return (<HistorialStack.Navigator>
      <HistorialStack.Screen 
        name="HistorialList" 
        component={ScreenHistorial} 
        options={{ headerShown: false }} 
      />
      <HistorialStack.Screen 
        name="DetalleHistorial" 
        component={ScreenDetalleHistorial} 
        options={{ title: 'Detalle del Envío' }} 
      />
    </HistorialStack.Navigator>
  );
}
const Stack = createStackNavigator();
export default function MyNavigation() {
  return (
    <Tab.Navigator>

      <Tab.Screen name="inicio"
        component={MyStackHome}
        options={{
          headerShown:false,
          //title: 'login',
          tabBarIcon: ({ color, size }) =>
            <FontAwesome name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen name='historial' component={HistorialStackScreen} options={{
        headerShown: false,
        title: 'Historial',
        tabBarIcon: ({ color, size }) =>
          <FontAwesome name="history" size={24} color="#555" />
      }} />
      <Tab.Screen name="configuracion"
        component={Configuracion}
        options={{
          headerShown: false,
          //title: 'login',
          tabBarIcon: ({ color, size }) =>
            <FontAwesome name="cog" size={size} color={color} />
        }}
      />

    </Tab.Navigator>

  )
}

export function MyStackLogin(){
  return(
    <Stack.Navigator>
      <Stack.Screen name='login' component={ScreenLogin} options={{ title: 'login', headerShown: false, animation: 'slide_from_left' }}/>
      <Stack.Screen name='registeruser' component={ScreenRegisterUser} options={{ title: 'register user', headerShown: false }} />
      <Stack.Screen name='registertransportista' component={ScreenRegisterTransportista} options={{ title: 'register transportista', headerShown: false }} />
    </Stack.Navigator>
  )
}

function Configuracion(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="configuracion" component={ScreenSettings} options={{ title: 'Configuración', headerShown: false }} />
    </Stack.Navigator>
  )
}


function MyStackHome() {
  const { transportista } = useContext(EstadoGlobalContext);

  return (
    <Stack.Navigator initialRouteName='menustack'>
      <Stack.Screen
        name="menustack"
        component={transportista ? ScreenHomeDelivery : ScreenHomeUsers}
        options={{ title: 'dashboard', headerShown: false }}
      />
    </Stack.Navigator>
  )
}
