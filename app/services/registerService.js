const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';

function getFriendlyError(status, message) {
  if (status === 409) {
    return 'Ese correo ya esta registrado. Usa otro correo o inicia sesion.';
  }

  if (message?.toLowerCase()?.includes('network request failed')) {
    return 'No se pudo conectar al backend. Si pruebas en celular, usa la IP local de tu PC en EXPO_PUBLIC_API_BASE_URL.';
  }

  return message || 'No se pudo registrar usuario.';
}

export async function registerAccount({ name, email, password, role }) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: cleanName,
        email: cleanEmail,
        password,
        rol: role,
      }),
    });
  } catch (error) {
    throw new Error(getFriendlyError(null, error?.message));
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload?.ok) {
    throw new Error(getFriendlyError(response.status, payload?.message));
  }

  return payload;
}
