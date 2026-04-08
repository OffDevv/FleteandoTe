import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ScreenRegisterUser() {
    const carroLogo  = require('../../Assets/images/logo.png')
  return (
    <View style = {styles.container}>
          <Text style={styles.mainText} >Registrate a </Text>
          <View style = {{backgroundColor:'green'}}>
          <Text style={styles.text} >FleteandoTe </Text>
          </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#FFC067',
    },
    mainText : {
        fontSize: 35,
        fontWeight: 'black',
        color: 'white',
        marginTop: 60
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 0
    },
})