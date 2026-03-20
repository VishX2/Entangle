const config = {
  // Use empty string for same-origin (Amplify proxy). Otherwise full API URL.
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  tokenKey: 'entangle_user_token',
  userKey: 'entangle_user',
};

export default config;
