
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

//añadimiento de las diferentes pantallas
import ScreenLogin from './Screen/login/ScreenLogin';
import ScreenHomeUsers from './Screen/Home/ScreenHomeUsers';
import ScreenTransportes from './Screen/Transportes/ScreenTransportes';
import ScreenHistorial from './Screen/Historial/ScreenHistorial';

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
      <Tab.Screen name='transportes' component={ScreenTransportes} options={{
        headerShown: false,
        title: 'Transportes',
        tabBarIcon: ({ color, size }) =>
          <FontAwesome name="truck" size={24} color="#555" />
      }} />

      <Tab.Screen name='historial' component={ScreenHistorial} options={{
        headerShown: false,
        title: 'Historial',
        tabBarIcon: ({ color, size }) =>
          <FontAwesome name="history" size={24} color="#555" />
      }} />


    </Tab.Navigator>

  )
}

function MyStackHome() {
  return (
    <Stack.Navigator initialRouteName='login'>
      <Stack.Screen name="login" component={ScreenLogin} options={{ title: 'dashboard', headerShown:false }} />
      <Stack.Screen name="menustack" component={ScreenHomeUsers} />
    </Stack.Navigator>
  )
}