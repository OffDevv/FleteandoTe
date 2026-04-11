import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { TextInput, Button, Card } from 'react-native-paper'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function ScreenRegisterTransportista() {
  const carroLogo = require('../../Assets/images/logo.png')
  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  //use state que serviran luego para  mandar la info a la base de datos
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [contra1, setContra1] = useState('');
  const [contra2, setContra2] = useState('');
  const [verPass, setVerPass] = useState(true)
  const [verPass2, setVerPass2] = useState(true)
  const presion = () => {
    console.log("presion boton registro transportista")
  }

  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ backgroundColor: '#FFC067' }} // Color de fondo del scroll
      contentContainerStyle={{ flexGrow: 1 }} // Obliga al contenido a expandirse
      bounces={false}>

      <Card style={{
        backgroundColor: '#ffffff',
        borderRadius: 35,
        position: 'absolute', // Se posiciona respecto al ScrollView
        top: 50,              // Distancia desde arriba (ajusta según el notch del cel)
        left: 20,             // Distancia desde la izquierda
        width: 50,            // Un ancho razonable para un botón de "atrás"
        height: 50,
        zIndex: 10,           // Asegura que esté por encima de todo
        justifyContent: 'center',
        alignItems: 'center'
      }} onPress={() => navigation.navigate('login')}>

        <AntDesign name="left" size={20} color="black" />
      </Card>

      <View style={styles.container}>
        <Text style={styles.mainText} >Estas listo para unirte al equipo de  </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={styles.text} >FleteandoTe </Text>
          <Image
            style={styles.image}        //el componente imagen me ayuda a poner imagenes y lo de blurbash sepa la bola pero esta en el manual
            source={carroLogo}
            placeholder={{ blurhash }}
            contentFit='cover'
            transition={1000}
          />
        </View>

        <View style={styles.cuadrosdatos}>
          <Text style={styles.datosLabels}>
            Nombre de tu empresa:
          </Text>
          <TextInput
            style={styles.inputs}
            placeholder="Empresa"
            value={nombreEmpresa} // 1. Conectamos el valor con el estado
            onChangeText={(texto) => {
              setNombreEmpresa(texto);        // 2. Guardamos el texto       aqui estoy viendo como mostrar en la consola que estoy guardando correctamentea en la variable set
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
          <Text style={styles.datosLabels}>
            Correo de tu empresa:
          </Text>
          <TextInput
            style={styles.inputs}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              console.log(texto);
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
          <Text style={styles.datosLabels}>
            Contraseña:
          </Text>
          <TextInput
            value={contra1}
            onChangeText={(texto) => {
              setContra1(texto);
              console.log(texto);
            }}
            secureTextEntry={verPass}
            style={styles.inputs}
            placeholder="Ej. SuperContraseña777"
            mode='outlined'
            placeholderTextColor="#c4c4c4"
            right={
              <TextInput.Icon
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
          <Text style={styles.datosLabels}>
            Escribe otra vez tu contraseña:
          </Text>
          <TextInput
            value={contra2}
            onChangeText={(texto) => {
              setContra2(texto);
              console.log(texto);
            }}
            secureTextEntry={verPass2}
            style={styles.inputs}
            placeholder="Ingresa tu de nuevo tu contraseña"
            mode='outlined'
            placeholderTextColor="#c4c4c4"
            right={
              <TextInput.Icon
                icon={props => (
                  <Ionicons
                    {...props}
                    name={verPass2 ? "eye-off" : "eye"}
                    size={20}
                    color="#9E9E9E"
                  />
                )}
                onPress={() => setVerPass2(!verPass2)}
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
          {/*esta parte de la logica me ayudara a hacer que suelte el mensaje de error si las contras no son las mismas*/}
          {contra2.length > 0 && contra1 !== contra2 && (
            <Text style={styles.errorText}>
              Las contraseñas no coinciden
            </Text>
          )}
          <Button
            mode='contained'
            style={styles.styleButtonLogin}
            onPress={presion}
            disabled={contra1 !== contra2 || contra1 === ''}
          >Crea tu cuenta</Button>
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
  mainText: {
    marginHorizontal:47,  //esto quita espacio de los lados
    // backgroundColor: 'green', lo puse nomas para ver que espacio ocupaba el texto jejeje
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
    marginTop: 65,
    marginBottom: 7,
    textAlign: 'center', // <--- Esto centra las líneas de texto entre sí
    paddingHorizontal: 20, // <--- Esto evita que el texto toque los bordes de la pantalla
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 0
  },
  image: {
    width: 70,
    height: 60,
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
  datosLabels: {
    marginTop: 30,
    marginHorizontal: 25,
    fontSize: 17

  },
  inputs: {

    alignSelf: 'center',
    width: '90%',
    marginHorizontal: 10,
    marginTop: 10
  },
  styleButtonLogin: {
    backgroundColor: '#2094FE',
    marginTop: 30,
    borderRadius: 12,
    alignSelf: 'stretch',
    marginHorizontal: 16,
    padding: 7
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: 'bold'
  },

})