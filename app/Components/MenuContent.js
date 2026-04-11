import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'

export default function MenuContent(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DrawerContentScrollView {...props}>
            <View style={styles.userSection}>
               
                <Text style={styles.userName}>Nombre de Usuario</Text>
            </View>
            <View style={styles.menuItems}>
            </View>
        </DrawerContentScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({})