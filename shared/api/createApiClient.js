/**
 * Shared API client factory
 * Used by both admin and client apps
 * @param {Object} options
 * @param {string} options.baseURL - API base URL (e.g. http://localhost:8000/api)
 * @param {string} options.tokenKey - localStorage key for auth token
 * @param {string} [options.userKey] - localStorage key for user object
 * @param {Function} [options.on401] - callback when 401 received (e.g. toast)
 */
import axios from 'axios';

export function createApiClient({ baseURL, tokenKey, userKey, on401 }) {
  const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.request.use((config) => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem(tokenKey) : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(tokenKey);
          if (userKey) localStorage.removeItem(userKey);
          window.dispatchEvent(new Event('storage'));
        }
        if (typeof on401 === 'function') on401(err);
      }
      return Promise.reject(err);
    }
  );

  return api;
}
