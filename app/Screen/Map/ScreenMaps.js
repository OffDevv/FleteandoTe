import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAvt9AnpvHfi3GKapnoSUKRqLTNR9tAaWo';

export default function ScreenMaps() {
    const [location, setLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [distancia, setDistancia] = useState(0);
    const [direccion, setDireccion] = useState('Toca el mapa para elegir destino');

    // MÉTODO NATIVO DE EXPO: No requiere fetch, es más estable en Android
    const handlePress = async (e) => {
        const coords = e.nativeEvent.coordinate;
        setDestination(coords);

        try {
            // Traduce coordenadas a dirección usando el sistema operativo
            let response = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            if (response.length > 0) {
                const item = response[0]; // Tomamos el primer resultado
                // Formateamos la dirección (Calle, Ciudad/Distrito)
                const direccionReal = `${item.street || 'Calle s/n'} ${item.name || ''}, ${item.city || item.subregion || ''}`;
                setDireccion(direccionReal);
                console.log("Dirección detectada:", direccionReal);
            }
        } catch (error) {
            console.log("Error en Geocoding Nativo:", error);
            setDireccion("Dirección no disponible");
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            let loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        })();
    }, []);

    if (!location) return <View style={styles.textoCarga}><Text style= {{padding:40, backgroundColor: 'green'}}>Cargando ubicación...</Text></View>;

    return (
        <View style={styles.container}>

            {/* CONTENEDOR FLOTANTE CON DISEÑO MEJORADO */}
            <View style={styles.floatingContainer}>
                {/* Caja de Distancia */}
                <View style={styles.infoBox}>
                    <Text style={styles.label}>DISTANCIA</Text>
                    <Text style={styles.distanceValue}>{distancia.toFixed(2)} km</Text>
                </View>

                {/* Caja de Dirección (Flexible para que quepa el texto largo) */}
                <View style={[styles.infoBox, { flex: 1 }]}>
                    <Text style={styles.label}>DESTINO</Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                        {direccion}
                    </Text>
                </View>
            </View>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                onPress={handlePress}
            >
                <Marker
                    coordinate={location}
                    title="Mi ubicación"
                    pinColor="red"
                />

                {destination && (
                    <Marker
                        coordinate={destination}
                        pinColor="blue"
                        title="Destino"
                    />
                )}

                {destination && (
                    <MapViewDirections
                        origin={location}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="#14ff7e" // Color verde neón
                        mode="DRIVING"
                        precision="high"
                        onReady={result => {
                            setDistancia(result.distance);
                        }}
                        onError={(errorMessage) => {
                            console.log("Error en la ruta:", errorMessage);
                        }}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    textoCarga:{
        flex: 1,                 // 1. Ocupa todo el espacio de la pantalla
        justifyContent: 'center', // 2. Centra verticalmente
        alignItems: 'center',    // 3. Centra horizontalmente
        backgroundColor: '#fff', 
    },
    container: { flex: 1 },
    map: { flex: 1 },
    floatingContainer: {
        position: 'absolute',
        top: 50,
        flexDirection: 'row',
        paddingHorizontal: 15,
        width: '100%',
        zIndex: 10,
        gap: 10,
    },
    infoBox: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 70
    },
    label: {
        fontSize: 10,
        color: '#888',
        fontWeight: 'bold',
        marginBottom: 3,
        letterSpacing: 1
    },
    distanceValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2094FE'
    },
    addressText: {
        fontSize: 11,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500'
    }
});




/*import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';


export default function ScreenMaps() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            //en esta parte solicitamos los permisos
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('El permiso para acceder a la localicacion fue denegado');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);
    if (errorMsg){
        return (
            <View style = {styles.container}>
                <Text>{errorMsg}</Text>
            </View>
        )
    }

    if(!location){
        return (
            <View style= {styles.container}>
                <Text>Cargando localizacion...</Text>
            </View>
        )
    }



    return (
        <View style = {styles.container}>
            <MapView
            style = {styles.map}
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}>
                <Marker
                coordinate={{
                    latitude: location.latitude,
                    longitude : location.longitude
                }}
                title='Tu estas aqui'
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    map :{
        flex:1,
    },
})
    */