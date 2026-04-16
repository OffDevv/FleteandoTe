import { getApiBaseUrlCandidates } from './apiConfig';

function getFriendlyError(status, message) {
  if (status === 409) {
    return 'Ese correo ya esta registrado. Usa otro correo o inicia sesion.';
  }

  if (message?.toLowerCase()?.includes('network request failed')) {
    return 'No se pudo conectar al backend. Si pruebas en celular, usa la IP local de tu PC en EXPO_PUBLIC_API_BASE_URL.';
  }

  return message || 'No se pudo registrar usuario.';
}

async function fetchJsonWithTimeout(url, options, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));
    return { response, payload };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function registerAccount({ name, email, password, role }) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  let lastError = null;
  for (const apiBaseUrl of getApiBaseUrlCandidates()) {
    try {
      const { response, payload } = await fetchJsonWithTimeout(`${apiBaseUrl}/api/register`, {
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
      }, 20000);
      if (!response.ok || !payload?.ok) {
        throw new Error(getFriendlyError(response.status, payload?.message));
      }

      return payload;
    } catch (error) {
      lastError = error;
      const errorMessage = String(error?.message || '').toLowerCase();
      if (errorMessage.includes('network request failed') || errorMessage.includes('aborted') || errorMessage.includes('aborterror')) {
        continue;
      }

      throw new Error(getFriendlyError(null, error?.message));
    }
  }

  throw new Error(getFriendlyError(null, lastError?.message));
}
