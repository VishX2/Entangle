import api from "../api/client";

const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

function buildFileName(file) {
  const safeName = (file?.name || "profile-picture").replace(/\s+/g, "-");
  return `${Date.now()}-${safeName}`;
}

async function uploadToImageKit(file, authEndpoint) {
  const { data: auth } = await api.get(authEndpoint);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", buildFileName(file));
  formData.append("publicKey", auth.publicKey);
  formData.append("signature", auth.signature);
  formData.append("expire", String(auth.expire));
  formData.append("token", auth.token);
  formData.append("useUniqueFileName", "true");
  formData.append("folder", "/entangle/profile-pictures");

  const response = await fetch(IMAGEKIT_UPLOAD_URL, { method: "POST", body: formData });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload?.url) throw new Error(payload?.message || "Image upload failed");
  return payload.url;
}

export async function uploadProfilePicture(file) {
  try {
    return await uploadToImageKit(file, "/imagekit/auth");
  } catch (e) {
    if (e?.response?.status === 401) {
      return uploadToImageKit(file, "/imagekit/auth-public");
    }
    throw e;
  }
}
