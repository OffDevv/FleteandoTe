const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function loginWithEmailPassword({ email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.message || 'No se pudo iniciar sesion.');
    }

    return { user: payload.data };
  } catch (error) {
    if (error?.message?.toLowerCase().includes('network request failed')) {
      throw new Error('No se pudo conectar al backend. Si pruebas en celular, usa la IP local de tu PC en EXPO_PUBLIC_API_BASE_URL.');
    }
    throw new Error(error?.message || 'No se pudo iniciar sesion.');
  }
}

export async function logoutCurrentUser() {
  return true;
}
