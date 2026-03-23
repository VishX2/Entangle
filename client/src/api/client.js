import toast from 'react-hot-toast';
import { createApiClient } from '@shared/api/createApiClient';
import config from '../config';

/** URLs where 401 should not show “session expired” (login/register, or ImageKit auth retry paths). */
const isAuthUrl = (url) =>
  typeof url === 'string' &&
  (url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/imagekit/auth'));

export const api = createApiClient({
  baseURL: `${config.apiUrl}/api`,
  tokenKey: config.tokenKey,
  userKey: config.userKey,
  on401: (err) => {
    if (!isAuthUrl(err?.config?.url)) {
      toast.error('Session expired. Please sign in again.');
    }
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || '';
    const isAuth = isAuthUrl(url);
    const message = err.response?.data?.error || err.message || 'Request failed';
    if (status && status >= 400 && status !== 401 && !isAuth) {
      toast.error(message);
    }
    return Promise.reject(err);
  }
);

export default api;
