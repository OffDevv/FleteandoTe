import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

export default function Miperfil(props) {
    return (
        <View style={styles.wrapper}>
            <Card style={styles.card}>
                <Card.Content style={styles.content}>
                    <Text style={styles.title}>Mi perfil</Text>
                    <Text style={styles.text}>Nombre: {props.dato.nombre}</Text>
                    <Text style={styles.text}>Correo: {props.dato.correo}</Text>
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        maxWidth: 380,
        borderRadius: 14,
        paddingVertical: 8,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 14,
    },
    text: {
        fontSize: 16,
        marginBottom: 6,
    },
})