import config from '../config';

/**
 * Ensures image URLs work on HTTPS pages (avoids mixed-content blocking).
 * When the page is HTTPS but the URL is HTTP (e.g. http://13.63.159.74/uploads/...),
 * rewrites to use the API base URL so the image loads.
 */
export function ensureHttpsImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();
  if (!trimmed) return url;
  if (typeof window === 'undefined') return url;
  if (window.location?.protocol !== 'https:') return url;
  if (!trimmed.startsWith('http://')) return url;
  const match = trimmed.match(/\/uploads\/([^?#]+)/);
  if (match) {
    const base = config.apiUrl?.replace(/\/$/, '') || '';
    return base ? `${base}/uploads/${match[1]}` : url;
  }
  return url;
}
