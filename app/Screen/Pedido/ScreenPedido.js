import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { EstadoGlobalContext } from '../../Context/EstadoGlobalUser';
import { getApiBaseUrlCandidates } from '../../services/apiConfig';

export default function ScreenPedido() {
  const navigation = useNavigation();
  const route = useRoute();
  const { destino, distancia } = route.params || {};
  const { usuario } = useContext(EstadoGlobalContext);

  const [detalle, setDetalle] = useState('');
  const [precio, setPrecio] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  const fetchConFallback = async (path, options = {}) => {
    const baseUrls = getApiBaseUrlCandidates();
    let lastError = null;

    for (const baseUrl of baseUrls) {
      try {
        const response = await fetch(`${baseUrl}${path}`, options);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok || payload?.ok === false) {
          throw new Error(payload?.message || 'No se pudo completar la solicitud.');
        }

        return payload;
      } catch (error) {
        lastError = error;
        const errorMessage = String(error?.message || '').toLowerCase();
        if (!errorMessage.includes('network request failed')) {
          throw error;
        }
      }
    }

    throw lastError || new Error('No se pudo conectar al backend.');
  };

  const subirPedido = async () => {
    if (!detalle.trim() || !precio.trim()) {
      Alert.alert('Campos incompletos', 'Completa el detalle y el precio para subir tu pedido.');
      return;
    }

    if (!usuario?.usuario_id) {
      Alert.alert('Sesion invalida', 'No se encontro el usuario logueado. Inicia sesion nuevamente.');
      return;
    }

    const precioNumerico = Number(String(precio).replace(',', '.'));
    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      Alert.alert('Precio invalido', 'Ingresa un precio numerico mayor a 0.');
      return;
    }

    const distanciaKm = typeof distancia === 'number' && distancia > 0 ? distancia : 0;
    if (distanciaKm <= 0) {
      Alert.alert('Ruta invalida', 'No se pudo calcular la distancia. Vuelve al mapa y confirma de nuevo.');
      return;
    }

    setSubiendo(true);
    try {
      await fetchConFallback('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.usuario_id,
          precio_ofrecido: precioNumerico,
          distancia_km: distanciaKm,
          detalle,
          destino,
        }),
      });

      Alert.alert('Pedido creado', 'Tu solicitud se subio y ya puede verla un transportista.');
      navigation.navigate('mapa');
    } catch (error) {
      Alert.alert('Error', error?.message || 'No se pudo subir el pedido.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Subir pedido</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Destino confirmado</Text>
        <Text style={styles.value}>{destino || 'No disponible'}</Text>

        <Text style={styles.label}>Distancia estimada</Text>
        <Text style={styles.value}>{typeof distancia === 'number' ? `${distancia.toFixed(2)} km` : 'No disponible'}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder='Detalle del pedido'
        value={detalle}
        onChangeText={setDetalle}
      />

      <TextInput
        style={styles.input}
        placeholder='Precio ofrecido'
        keyboardType='numeric'
        value={precio}
        onChangeText={setPrecio}
      />

      <TouchableOpacity style={[styles.button, subiendo && styles.buttonDisabled]} onPress={subirPedido} disabled={subiendo}>
        <Text style={styles.buttonText}>{subiendo ? 'Subiendo...' : 'Subir pedido'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff8ef',
    borderColor: '#ffd39c',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },
  value: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff7a00',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});