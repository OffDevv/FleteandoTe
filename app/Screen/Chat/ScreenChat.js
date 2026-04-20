import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { EstadoGlobalContext } from '../../Context/EstadoGlobalUser';
import { sendMessage, fetchMessages } from '../../services/messageService';


export default function ScreenChat({ route }) {
  const { usuario } = useContext(EstadoGlobalContext);
  const { pedidoId, receptorId, receptorNombre } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    cargarMensajes();
    const interval = setInterval(cargarMensajes, 3000); // Refresca cada 3 seg
    return () => clearInterval(interval);
  }, []);

  const cargarMensajes = async () => {
    const msgs = await fetchMessages(pedidoId);
    console.log('Mensajes recibidos:', msgs);
    setMessages(msgs);
  };

  const enviar = async () => {
    if (!input.trim()) return;
    await sendMessage({
      flete_id: pedidoId,
      emisor_id: usuario.usuario_id,
      receptor_id: receptorId,
      mensaje: input.trim(),
    });
    setInput('');
    cargarMensajes();
  };

  const renderItem = ({ item }) => (
    <View style={[styles.msg, item.emisor_id === usuario.usuario_id ? styles.mine : styles.theirs]}>
      <Text style={styles.msgText}>{item.mensaje}</Text>
      <Text style={styles.msgMeta}>{item.fecha_envio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat con {receptorNombre}</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={enviar}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontWeight: 'bold', fontSize: 18, marginBottom: 10, textAlign: 'center' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, padding: 10, marginRight: 10 },
  sendBtn: { backgroundColor: '#ff9f1a', padding: 12, borderRadius: 20 },
  msg: { padding: 10, borderRadius: 10, marginVertical: 4, maxWidth: '80%' },
  mine: { backgroundColor: '#ffe5b4', alignSelf: 'flex-end' },
  theirs: { backgroundColor: '#eee', alignSelf: 'flex-start' },
  msgText: { fontSize: 15 },
  msgMeta: { fontSize: 10, color: '#888', marginTop: 2, textAlign: 'right' },
});
