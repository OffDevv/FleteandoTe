import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Saludo(props) {
  return (
    <View>
          <Text style={styles.question}>ya sabes a donde te dirijiras hoy {props.nombre}? </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    question: {
        fontSize: 30,
        color: '#000000',
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
})