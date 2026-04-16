  
import React from 'react';
import { View, Text } from 'react-native'; // <--- ESTO ES LO QUE TE FALTA

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Text style={{ color: '#777' }}>
        © {year} TuApp. Todos los derechos reservados.
      </Text>
    </View>
  );
};

export default Footer;
