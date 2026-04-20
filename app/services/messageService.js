// Servicio simple para mensajes (ajusta endpoints según tu backend)

const API_BASE_URL = 'https://zestful-recreation-production-020f.up.railway.app';

export async function fetchMessages(flete_id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/mensajes/${flete_id}`);
    const data = await res.json();
    return data.mensajes || [];
  } catch (e) {
    return [];
  }
}

export async function sendMessage({ flete_id, emisor_id, receptor_id, mensaje }) {
  try {
    await fetch(`${API_BASE_URL}/api/mensajes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flete_id, emisor_id, receptor_id, mensaje }),
    });
  } catch (e) {}
}
