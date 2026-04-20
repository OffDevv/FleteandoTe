import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'  // ✅ quitados Icon y Card que no se usan
import React, { useState } from 'react'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { registerAccount } from '../../services/registerService';

export default function ScreenRegisterUser() {
  const carroLogo = require('../../Assets/images/logoFleteandote.png')
  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  // ✅ FIX 1: navigation declarado al inicio
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contra1, setContra1] = useState('');
  const [contra2, setContra2] = useState('');
  const [verPass, setVerPass] = useState(true);
  const [verPass2, setVerPass2] = useState(true);
  const [loading, setLoading] = useState(false);

  const presion = async () => {
    const cleanNombre = nombre.trim();
    const cleanEmail = email.trim();

    if (!cleanNombre || !cleanEmail || !contra1 || !contra2) {
      Alert.alert('Campos incompletos', 'Completa todos los campos para registrarte.');
      return;
    }

    if (contra1 !== contra2) {
      Alert.alert('Contraseñas', 'Las contraseñas no coinciden.');
      return;
    }

    if (contra1.length < 6) {
      Alert.alert('Contraseña insegura', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await registerAccount({
        name: cleanNombre,
        email: cleanEmail,
        password: contra1,
        role: 'user',
      });

      Alert.alert('Registro exitoso', 'Tu cuenta fue creada correctamente.'); // ✅ mensaje más descriptivo
      navigation.navigate('login');
    } catch (error) {
      Alert.alert('No se pudo registrar', error.message || 'Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX 3: tema reutilizable para no repetirlo 4 veces
  const inputTheme = {
    colors: {
      primary: '#cccccc',
      background: '#F5F5F5',
      outline: 'transparent',
    },
    roundness: 15,
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#FFC067' }}
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      keyboardShouldPersistTaps="handled" // ✅ FIX 5: evita que el teclado cierre al tocar el scroll
    >
      {/* ✅ FIX 2: TouchableOpacity en lugar de Card */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('login')}
        activeOpacity={0.8}
      >
        <AntDesign name="left" size={20} color="black" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.mainText}>Regístrate a</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.text}>FleteandoTe </Text>
          <Image
            style={styles.image}
            source={carroLogo}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>

        <View style={styles.cuadrosdatos}>
          <Text style={styles.datosLabels}>Nombre:</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChangeText={setNombre} // ✅ FIX 3: simplificado, sin console.log
            mode="outlined"
            placeholderTextColor="#c4c4c4"
            autoCapitalize="words"   // ✅ capitaliza nombre propio
            theme={inputTheme}
          />

          <Text style={styles.datosLabels}>Email:</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Ingresa tu email"
            value={email}
            onChangeText={setEmail}  // ✅ FIX 3: simplificado
            mode="outlined"
            placeholderTextColor="#c4c4c4"
            keyboardType="email-address" // ✅ FIX 4: teclado correcto para email
            autoCapitalize="none"        // ✅ FIX 4: sin mayúsculas automáticas
            autoCorrect={false}          // ✅ sin autocorrección en emails
            theme={inputTheme}
          />

          <Text style={styles.datosLabels}>Escribe tu contraseña:</Text>
          <TextInput
            value={contra1}
            onChangeText={setContra1} // ✅ FIX 3: simplificado
            secureTextEntry={verPass}
            style={styles.inputs}
            placeholder="Ej. SuperContraseña777"
            mode="outlined"
            placeholderTextColor="#c4c4c4"
            autoCapitalize="none" // ✅ sin autocapitalización en contraseñas
            theme={inputTheme}
            right={
              <TextInput.Icon
                icon={(props) => (
                  <Ionicons
                    {...props}
                    name={verPass ? 'eye-off' : 'eye'}
                    size={20}
                    color="#9E9E9E"
                  />
                )}
                onPress={() => setVerPass(!verPass)}
              />
            }
          />

          <Text style={styles.datosLabels}>Escribe otra vez tu contraseña:</Text>
          <TextInput
            value={contra2}
            onChangeText={setContra2} // ✅ FIX 3: simplificado
            secureTextEntry={verPass2}
            style={styles.inputs}
            placeholder="Ingresa de nuevo tu contraseña"
            mode="outlined"
            placeholderTextColor="#c4c4c4"
            autoCapitalize="none"
            theme={inputTheme}
            right={
              <TextInput.Icon
                icon={(props) => (
                  <Ionicons
                    {...props}
                    name={verPass2 ? 'eye-off' : 'eye'}
                    size={20}
                    color="#9E9E9E"
                  />
                )}
                onPress={() => setVerPass2(!verPass2)}
              />
            }
          />

          {contra2.length > 0 && contra1 !== contra2 && (
            <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
          )}

          <Button
            mode="contained"
            style={styles.styleButtonLogin}
            onPress={presion}
            loading={loading}
            disabled={loading || contra1 !== contra2 || contra1 === ''}
          >
            Crea tu cuenta
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: '#FFC067',
  },
  // ✅ FIX 2: estilo propio para el botón de regreso
  backButton: {
    backgroundColor: '#ffffff',
    borderRadius: 35,
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainText: {
    fontSize: 35,
    fontWeight: 'bold',  // ✅ 'black' no es válido en RN, reemplazado por 'bold'
    color: 'white',
    marginTop: 70,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 0,
  },
  image: {
    width: 70,
    height: 60,
  },
  cuadrosdatos: {
    flex: 1,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 30, // ✅ FIX 5: espacio interno para que el botón no quede pegado al borde
  },
  datosLabels: {
    marginTop: 30,
    marginHorizontal: 25,
    fontSize: 17,
  },
  inputs: {
    alignSelf: 'center',
    width: '90%',
    marginHorizontal: 10,
    marginTop: 10,
  },
  styleButtonLogin: {
    backgroundColor: '#2094FE',
    marginTop: 30,
    borderRadius: 12,
    alignSelf: 'stretch',
    marginHorizontal: 16,
    padding: 7,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});