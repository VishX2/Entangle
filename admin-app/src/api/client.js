import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('entangle_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || '';
    const isAuth = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/login-admin');
    const message = err.response?.data?.error || err.message || 'Request failed';

    if (status === 401) {
      localStorage.removeItem('entangle_admin_token');
      localStorage.removeItem('entangle_admin_user');
      window.dispatchEvent(new Event('storage'));
      if (!isAuth) toast.error('Session expired. Please sign in again.');
    } else if (status && status >= 400 && !isAuth) {
      toast.error(message);
    }
    return Promise.reject(err);
  }
);

export default api;
