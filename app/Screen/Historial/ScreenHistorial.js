import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native';
import { EstadoGlobalContext } from '../../Context/EstadoGlobalUser';
import { getApiBaseUrlCandidates } from '../../services/apiConfig';


export default function ScreenHistorial({ navigation }) {
  const { usuario } = useContext(EstadoGlobalContext);
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);

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

  const formatearFecha = (valor) => {
    if (!valor) {
      return 'Sin fecha';
    }

    const fecha = new Date(valor);
    if (Number.isNaN(fecha.getTime())) {
      return 'Sin fecha';
    }

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const formatearHora = (valor) => {
    if (!valor) {
      return 'Sin hora';
    }

    const fecha = new Date(valor);
    if (Number.isNaN(fecha.getTime())) {
      return 'Sin hora';
    }

    return fecha.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const cargarHistorial = useCallback(async () => {
    if (!usuario?.usuario_id) {
      setHistorial([]);
      setCargando(false);
      return;
    }

    setCargando(true);
    try {
      const payload = await fetchConFallback(`/api/historial/${usuario.usuario_id}`);
      setHistorial(Array.isArray(payload?.data) ? payload.data : []);
    } catch (error) {
      console.error('Error al cargar historial:', error);
      Alert.alert('Error', error?.message || 'No se pudo obtener el historial.');
    } finally {
      setCargando(false);
    }
  }, [usuario?.usuario_id]);

  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [cargarHistorial])
  );

  const totalSolicitudesUsuario = historial.filter((item) => item.tipo_historial === 'solicitud_usuario').length;
  const totalPedidosTransportista = historial.filter((item) => item.tipo_historial === 'pedido_transportista').length;

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()} 
        >
          <Ionicons name="menu-outline" size={30} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial</Text>
      </View>

      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>{historial.length} registros en total</Text>
        <Text style={styles.summarySubText}>Solicitudes: {totalSolicitudesUsuario} | Pedidos transportista: {totalPedidosTransportista}</Text>
      </View>

      <View style={styles.content}>
        {cargando ? <ActivityIndicator size="large" color="#666" style={styles.loader} /> : null}

        {!cargando && historial.length === 0 ? (
          <Text style={styles.emptyText}>Aun no hay registros para mostrar.</Text>
        ) : null}

        {!cargando && historial.map((item) => {
          const fechaBase = item.fecha_evento || item.hora_fin || item.hora_inicio;
          const tipoLabel = item.tipo_historial === 'solicitud_usuario'
            ? 'Solicitud del usuario'
            : 'Pedido del transportista';

          return (
            <View
              key={`${item.tipo_historial}-${item.solicitud_id}`}
              style={styles.card}
            >
              <View style={styles.cardInfo}>
                <Text style={styles.dateText}>{formatearFecha(fechaBase)}</Text>
                <Text style={styles.timeText}>{formatearHora(item.hora_inicio)} - {formatearHora(item.hora_fin)}</Text>
                <Text style={styles.userText}>Usuario: {item.nombre_usuario || 'Sin nombre'}</Text>
                <Text style={styles.priceText}>Precio: ${item.precio_ofrecido ?? 'N/D'} | Estado: {item.estado || 'N/D'}</Text>
              </View>

              <View style={styles.cardStatus}>
                <Text style={styles.typeText}>{tipoLabel}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff', 
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  menuButton: {
    zIndex: 1,
  },
  summaryBar: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 10,
    alignItems: 'center',
  },
  summaryText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  summarySubText: {
    marginTop: 3,
    color: '#444',
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    color: '#777',
    fontSize: 15,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    color: '#999',
    fontSize: 14,
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  typeText: {
    color: '#8b8b8b',
    marginRight: 10,
    fontSize: 12,
    textAlign: 'right',
  },
  userText: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
  priceText: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
});