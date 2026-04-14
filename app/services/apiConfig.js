import { Platform } from 'react-native';

const DEVELOPMENT_ANDROID_API_BASE_URL = 'http://10.0.2.2:4000';
const DEVELOPMENT_IOS_API_BASE_URL = 'http://localhost:4000';

export function getApiBaseUrl() {
  const configuredBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    return Platform.OS === 'android'
      ? DEVELOPMENT_ANDROID_API_BASE_URL
      : DEVELOPMENT_IOS_API_BASE_URL;
  }

  throw new Error('Define EXPO_PUBLIC_API_BASE_URL con una URL publica antes de generar el APK.');
}

export function getApiBaseUrlCandidates() {
  const candidates = [];
  const configuredBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  const devBaseUrl = Platform.OS === 'android'
    ? DEVELOPMENT_ANDROID_API_BASE_URL
    : DEVELOPMENT_IOS_API_BASE_URL;

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    candidates.push(devBaseUrl);
  }

  if (configuredBaseUrl) {
    if (!candidates.includes(configuredBaseUrl)) {
      candidates.push(configuredBaseUrl);
    }
  }

  return candidates;
}