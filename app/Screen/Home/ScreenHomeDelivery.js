import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EstadoGlobalContext } from '../../Context/EstadoGlobalUser';
import { getApiBaseUrlCandidates } from '../../services/apiConfig';

const HomeScreenDelivery = () => {
  const { usuario } = useContext(EstadoGlobalContext);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [aceptandoId, setAceptandoId] = useState(null);

  const fetchConFallback = async (path, options = {}) => {
    const baseUrls = getApiBaseUrlCandidates();
    let lastError = null;

    for (const baseUrl of baseUrls) {
      try {
        const response = await fetch(`${baseUrl}${path}`, options);
        const payload = await response.json().catch(() => ({}));

        if (!response.ok || payload?.ok === false) {
          throw new Error(payload?.message || 'La solicitud no se pudo completar.');
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

  const obtenerPedidos = async () => {
    setCargando(true);
    try {
      const payload = await fetchConFallback('/api/pedidos/pendientes');
      setPedidos(Array.isArray(payload?.data) ? payload.data : []);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      Alert.alert('Error', error?.message || 'No se pudieron obtener los pedidos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const aceptarPedido = async (pedidoId) => {
    if (!usuario?.usuario_id) {
      Alert.alert('Sesion invalida', 'No se encontro el ID del transportista. Inicia sesion nuevamente.');
      return;
    }

    setAceptandoId(pedidoId);
    try {
      await fetchConFallback(`/api/pedidos/aceptar/${pedidoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      Alert.alert('Pedido aceptado', 'Has aceptado el pedido exitosamente');
      obtenerPedidos();
    } catch (error) {
      console.error('Error al aceptar pedido:', error);
      Alert.alert('Error', error?.message || 'No se pudo aceptar el pedido');
    } finally {
      setAceptandoId(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoCapsule}>
          <Text style={styles.logoText}>FleteandoTe</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Pedidos pendientes</Text>

        {cargando ? <ActivityIndicator size="large" color="#555" style={styles.loader} /> : null}

        {!cargando && pedidos.length === 0 ? (
          <Text style={styles.emptyText}>No hay pedidos pendientes en este momento.</Text>
        ) : null}

        {!cargando && pedidos.map((pedido) => (
          <View key={pedido.solicitud_id} style={styles.card}>
            <Text style={styles.cardTitle}>Pedido #{pedido.solicitud_id}</Text>
            <Text style={styles.cardText}>Usuario: {pedido.nombre_usuario || 'Sin nombre'}</Text>
            <Text style={styles.cardText}>Precio: ${pedido.precio_ofrecido ?? 'N/D'}</Text>
            <Text style={styles.cardText}>Estado: {pedido.estado}</Text>

            <TouchableOpacity
              style={[styles.acceptButton, aceptandoId === pedido.solicitud_id && styles.acceptButtonDisabled]}
              onPress={() => aceptarPedido(pedido.solicitud_id)}
              disabled={aceptandoId === pedido.solicitud_id}
            >
              <Text style={styles.acceptButtonText}>
                {aceptandoId === pedido.solicitud_id ? 'Aceptando...' : 'Aceptar pedido'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.separator} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFC470',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  menuButton: {
    marginRight: 15,
  },
  logoCapsule: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    fontSize: 15,
    color: '#777',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff8ef',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ffd39c',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor: '#ff9f1a',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    opacity: 0.65,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#ececec',
    width: '88%',
    alignSelf: 'center',
    marginVertical: 14,
    borderRadius: 999,
  },
});

export default HomeScreenDelivery;