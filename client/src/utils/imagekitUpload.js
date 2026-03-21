import api from "../api/client";

const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

function buildFileName(file) {
  const safeName = (file?.name || "profile-picture").replace(/\s+/g, "-");
  return `${Date.now()}-${safeName}`;
}

async function uploadViaImageKit(file, authEndpoint = "/imagekit/auth") {
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

  const response = await fetch(IMAGEKIT_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload?.url) {
    throw new Error(payload?.message || "Image upload failed");
  }

  return payload.url;
}

async function uploadViaServer(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/documents/upload-public", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!data?.file_url) {
    throw new Error("Profile upload fallback failed");
  }

  return data.file_url;
}

export async function uploadProfilePicture(file) {
  try {
    return await uploadViaImageKit(file);
  } catch (error) {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        return await uploadViaImageKit(file, "/imagekit/auth-public");
      } catch (e) {
        return uploadViaServer(file);
      }
    }
    if (status === 503 || status === 404) {
      return uploadViaServer(file);
    }
    if (error?.message === "Network Error") {
      return uploadViaServer(file);
    }
    throw error;
  }
}
