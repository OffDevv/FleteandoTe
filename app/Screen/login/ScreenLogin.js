import React, { useState, useContext, use } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { EstadoGlobalContext } from '../../Context/EstadoGlobalUser';
import { useNavigation } from '@react-navigation/native';

//importacion del icono de los ojos:
import Ionicons from '@expo/vector-icons/Ionicons';



export default function ScreenLogin() {

    //constante de las navegacoiones a otras ventanas
    const navigation = useNavigation();
    //vamos a poner un useState para ver nuestra contraseña
    const [verPass, setVerPass] = useState(true);

    //me falta setear el nombre y el password
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const presion = () => {
        console.log("me presionaste") //creamos una famosa funcion llamada presion para verificar que el boton funciona
    }


    //funcion para hacer set al login de forma global
    const { setLogin } = useContext(EstadoGlobalContext);
    const {setUsuario} = useContext(EstadoGlobalContext);

    //funcion para loguearse
    const login = () => {
        if (mail !== '' && password == '123') {
            setUsuario(mail)
            setLogin(true);
            Alert.alert('Bienvenido usuario')
        } else {
            Alert.alert('datos incorrectos')
        }
    }

    return (
        <ScrollView
            style={{ backgroundColor: '#FFC067' }} // Color de fondo del scroll
            contentContainerStyle={{ flexGrow: 1 }} // Obliga al contenido a expandirse
            bounces={false}>
            <View style={styles.container}>
                {//<View style={{  backgroundColor: 'green' }}>
                    <Text style={styles.text}>Es un gusto verte por aqui</Text>
                    //</View>
                }
                <View style={styles.cuadrosdatos}>
                    <Text style={styles.textoBienvenido}>Bienvenido de vuelta</Text>
                    <Text style={styles.ingresaCredenciales}>Ingresa tus credenciales</Text>

                    <Text style={{ marginTop: 20, marginHorizontal: 19, fontSize: 17 }}>Email:</Text>
                    
                    
                    
                    
                    <TextInput
                        style={styles.inputs}
                        placeholder="Ingresa tu email"
                        value={mail} // 1. Conectamos el valor con el estado
                        onChangeText={(texto) => {
                            setMail(texto);        // 2. Guardamos el texto       aqui estoy viendo como mostrar en la consola que estoy guardando correctamentea en la variable set
                            console.log(texto);   // 3. Lo vemos en consola
                        }}
                        mode="outlined"
                        placeholderTextColor="#c4c4c4"
                        theme={{
                            colors: {
                                primary: '#cccccc',      // le pongo color del borde activo
                                background: '#F5F5F5',   // le pongo color de fondo del input
                                outline: 'transparent' //esto le quita la linea negra fea que viene con el textInput de react native
                            },
                            roundness: 15
                        }}
                    />




                    <Text style={{ marginTop: 20, marginHorizontal: 19, fontSize: 17 }}>Contraseña:</Text>
                    <TextInput
                        value={password}
                        onChangeText={(texto) => {
                            setPassword(texto);
                            console.log(texto);
                        }}
                        secureTextEntry={verPass}
                        style={styles.inputs}
                        placeholder="Ingresa tu contraseña"
                        mode='outlined'
                        placeholderTextColor="#c4c4c4"
                        right={
                            /*
                            <TextInput.Icon
                                icon={verPass ? "eye" : "eye-off"}
                                onPress={() => setVerPass(!verPass)}                         //esta es la version facil de hacer
                            /> 
                            */
                            <TextInput.Icon
                                // 1. Usamos la función para renderizar Ionicons            
                                // 2. Corregimos el nombre de la variable a verPass          //esta es la version un poco mas complicada por que uso props para agarrar los iconos de la libreria de ionicons
                                icon={props => (
                                    <Ionicons
                                        {...props}
                                        name={verPass ? "eye-off" : "eye"}
                                        size={20}
                                        color="#9E9E9E"
                                    />
                                )}
                                onPress={() => setVerPass(!verPass)}
                            />
                        }
                        theme={{
                            colors: {
                                primary: '#cccccc',      // aqui agrego color del borde activo
                                background: '#F5F5F5',   // le quito ese color feo morado y le pongo color al fondo del input
                                outline: 'transparent' //esto le quita la linea negra fea que viene con el textInput de react native
                            },
                            roundness: 15
                        }}
                    />

                    <Button
                        mode='contained'
                        style={styles.styleButtonLogin}
                        onPress={login}
                    >Iniciar sesion</Button>

                    <Text style={{ marginTop: 50, fontSize: 16, alignSelf: 'center' }}>¿No tienes cuenta?</Text>
                    {/*
                <Button
                    mode="text"
                    textColor="#2094FE" // Aquí pones el color que quieras (ejemplo: el naranja de tu fondo)
                    onPress={() => console.log('Registro usuario')}
                    labelStyle={{ fontSize: 16, fontWeight: 'black' }}>registrate aqui como usuario</Button>
                <Button
                    mode="text"
                    textColor="#2094FE" // Aquí pones el color que quieras (ejemplo: el naranja de tu fondo)
                    onPress={() => console.log('Registro usuario')}
                    labelStyle={{ fontSize: 16, fontWeight: 'black' }}>registrate aqui como cargamentero</Button>
*/}
                    <View style={styles.containerOpciones}>
                        <TouchableOpacity
                            style={styles.botonOpcion}
                            onPress={() => navigation.navigate('registeruser')

                                /*console.log('Registro usuario')*/}
                        >
                            <Text style={styles.textoBotonOpcion}>
                                Regístrate aquí como usuario
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botonOpcion}
                            onPress={() => navigation.navigate('registertransportista')
                                /*console.log('Registro flete')*/}
                        >
                            <Text style={styles.textoBotonOpcion}>
                                Regístrate aquí como fletero
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#FFC067',
    },
    text: {

        fontSize: 40,
        padding: 35,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 45
    },
    cuadrosdatos: {
        flex: 1,                  // ocupa el espacio restante
        width: '90%',             // ancho relativo
        backgroundColor: '#fff',
        borderRadius: 50,
        marginTop: 20,            // espacio entre el texto y el cuadro
        marginBottom: 30,         // espacio entre el cuadro y el final de la pantalla
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    textoBienvenido: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 45,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 22


    },
    ingresaCredenciales: {
        color: '#9E9E9E',
        fontSize: 19,
        fontWeight: '250',
        justifyContent: 'flex-start',
        marginLeft: 22

    },
    input: {
        width: '85%',          // ancho relativo dentro del cuadro
        height: 45,            // alto fijo
        borderWidth: 1,        // borde visible
        borderColor: '#ccc',   // color del borde
        borderRadius: 10,      // esquinas redondeadas
        paddingHorizontal: 10, // espacio interno
        marginTop: 5          // separación respecto al texto anterior
    },
    inputs: {

        alignSelf: 'center',
        width: '90%',
        marginHorizontal: 10,
        marginTop: 10
    },
    styleButtonLogin: {
        backgroundColor: '#2094FE',
        marginTop: 45,
        borderRadius: 12,
        alignSelf: 'stretch',
        marginHorizontal: 16,
        padding: 7
    },
    containerOpciones: {
        flexDirection: 'row',        // Lo que hace es que alineo uno al lado del otro    basivamente esto hizo toda la magia de moverlos de un lado a otro
        width: '100%',               // Ocupa el ancho del cuadro blanco
        justifyContent: 'center',    // Centra el contenido
        marginTop: 15,
        paddingHorizontal: 10,       // Pequeño espacio a los lados
        marginBottom: 28
    },
    botonOpcion: {
        flex: 1,                     // Cada "botón" toma el 50%
        padding: 5,                  // Espacio para facilitar el click
    },
    textoBotonOpcion: {
        fontSize: 14,
        color: '#2094FE',
        textAlign: 'center',         // Centra el texto en su columna
        fontWeight: '500',           // Un poco de grosor
        lineHeight: 18,              // Espacio entre las dos líneas
    },

});


