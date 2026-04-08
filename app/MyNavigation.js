
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

import ScreenHomeUsers from './Screen/Home/ScreenHomeUsers';
import ScreenHomeDelivery from './Screen/Home/ScreenHomeDelivery';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenTransportes from './Screen/Transportes/ScreenTransportes';
import ScreenHistorial from './Screen/Historial/ScreenHistorial';

const Stack = createStackNavigator();
export default function MyNavigation() {
    return (
        <Tab.Navigator>
             <Tab.Screen name="menu"
             component= {ScreenHomeUsers}
             options={{
                headerShown:false,
                title:'Inicio',
                tabBarIcon:({color,size}) =>
                    <FontAwesome name="home" size={24} color="#555" />
             }}
              />
              <Tab.Screen name='transportes' component={ScreenTransportes} options={{
                headerShown:false,
                title:'Transportes', 
                tabBarIcon:({color,size}) =>
                    <FontAwesome name="truck" size={24} color="#555" />
             }} />

             <Tab.Screen name='historial' component={ScreenHistorial} options={{
                headerShown:false,
                title:'Historial', 
                tabBarIcon:({color,size}) =>
                    <FontAwesome name="history" size={24} color="#555" />
             }} />

           
        </Tab.Navigator>
        
    )
}

/*function MyStackHome(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="menustack" component={ScreenHomeUsers}  />
        </Stack.Navigator>
    )
}*/