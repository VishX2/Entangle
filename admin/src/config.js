/* Admin app configuration */
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  tokenKey: 'entangle_admin_token',
  userKey: 'entangle_admin_user',
};

export default config;
