/**
 * Client app configuration - all env variables via config
 */
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  tokenKey: 'entangle_user_token',
  userKey: 'entangle_user',
};

export default config;
