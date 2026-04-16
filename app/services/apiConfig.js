import { Platform } from 'react-native';

const DEVELOPMENT_ANDROID_API_BASE_URL = 'http://10.0.2.2:4000';
const DEVELOPMENT_IOS_API_BASE_URL = 'http://localhost:4000';
const DEFAULT_PRODUCTION_API_BASE_URL = 'https://zestful-recreation-production-020f.up.railway.app';

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

  return DEFAULT_PRODUCTION_API_BASE_URL;
}

export function getApiBaseUrlCandidates() {
  const candidates = [];
  const configuredBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  const devBaseUrl = Platform.OS === 'android'
    ? DEVELOPMENT_ANDROID_API_BASE_URL
    : DEVELOPMENT_IOS_API_BASE_URL;

  if (configuredBaseUrl) {
    candidates.push(configuredBaseUrl);
  }

  if (!configuredBaseUrl && (typeof __DEV__ === 'undefined' || !__DEV__)) {
    candidates.push(DEFAULT_PRODUCTION_API_BASE_URL);
  }

  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    if (!candidates.includes(devBaseUrl)) {
      candidates.push(devBaseUrl);
    }
  }

  return candidates;
}