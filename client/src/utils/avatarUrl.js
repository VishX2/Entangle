const DEFAULT_AVATAR =
  'https://ik.imagekit.io/nilonbee/entangle/profile-pictures/1774092208750-ff956a6c-6f1b-4b5f-b7e2-c755b927756e_k8gSQ2C-j.jpeg?updatedAt=1774092210020';

/** Use ImageKit URL when valid (https), relative path (/), else default avatar. */
export function getAvatarUrl(url) {
  if (url && typeof url === 'string') {
    const u = url.trim();
    if (u.startsWith('https://')) return u;
    if (u.startsWith('/')) return u;
  }
  return DEFAULT_AVATAR;
}

export { DEFAULT_AVATAR };
