import { getApiBaseUrlCandidates } from './apiConfig';

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

export async function loginWithEmailPassword({ email, password }) {
  const baseUrls = getApiBaseUrlCandidates();
  let lastError = null;

  for (const apiBaseUrl of baseUrls) {
    try {
      const { response, payload } = await fetchJsonWithTimeout(`${apiBaseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || 'No se pudo iniciar sesion.');
      }

      return { user: payload.data };
    } catch (error) {
      lastError = error;

      const errorMessage = String(error?.message || '').toLowerCase();
      const isNetworkError = errorMessage.includes('network request failed') || errorMessage.includes('aborted');
      if (!isNetworkError) {
        throw new Error(error?.message || 'No se pudo iniciar sesion.');
      }
    }
  }

  try {
    throw lastError || new Error('No se pudo iniciar sesion.');
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
