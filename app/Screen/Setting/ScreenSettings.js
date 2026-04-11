import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { EstadoGlobalContext } from '../../Context/EstadoGlobalUser';
import Miperfil from '../../Components/Setting/Miperfil';

export default function ScreenSettings() {
  const { setLogin, setUsuario, setTransportista, usuario } = React.useContext(EstadoGlobalContext);

  const persona = {
    nombre: usuario?.nombre || 'Sin nombre',
    correo: usuario?.email || 'Sin correo',
  }

  const cerrarSesion = () => {
    setLogin(false);
    setUsuario(null);
    setTransportista(false);
  }

  return (
    <View style={styles.container}>
      <Miperfil 
        dato={persona}
      />
      <Button 
           title="Cerrar Sesion"
             onPress={cerrarSesion}
             style={styles.boton}
             marginTop={10}
           >
             Cerrar Sesion
           </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#FFC470', // color de fondo
    padding: 6,
    width: '80%',
    maxWidth: 340,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF', // color del texto
    fontSize: 16,
    fontWeight: 'bold',
  },
})