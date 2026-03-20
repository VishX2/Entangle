# Amplify API Proxy Setup (fixes mixed-content)

Use Amplify rewrites to proxy `/api` to your backend so the browser sees same-origin requests (no mixed-content blocking).

## Prerequisites

**The proxy target must be HTTPS.** Amplify does not proxy to HTTP backends.

### Option A: Cloudflare Tunnel (quickest, no domain)

On your EC2 instance:

```bash
# Download cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64 -o cloudflared
chmod +x cloudflared

# Run tunnel (proxies localhost:8000 to HTTPS)
./cloudflared tunnel --url http://localhost:8000
```

You'll get a URL like `https://xxxx-xx-xx-xx-xx.trycloudflare.com`. Use this as your backend HTTPS URL.

### Option B: Nginx + Let's Encrypt (requires domain)

Point a domain (e.g. `api.yourdomain.com`) to your EC2 IP, then set up nginx + certbot for SSL.

---

## 1. Amplify Console: Rewrites and redirects

1. Open **Amplify Console** → your app → **Hosting** → **Rewrites and redirects**
2. Click **Edit**
3. Add these rules **before** any SPA catch-all (`/<*>` → `/index.html`):

```json
{
  "source": "/api/<*>",
  "status": "200",
  "target": "https://YOUR-BACKEND-HTTPS-URL/api/<*>",
  "condition": null
},
{
  "source": "/api",
  "status": "200",
  "target": "https://YOUR-BACKEND-HTTPS-URL/api",
  "condition": null
}
```

Replace `YOUR-BACKEND-HTTPS-URL` with your HTTPS backend (e.g. `https://xxxx.trycloudflare.com` or `https://api.yourdomain.com`).

---

## 2. Amplify Environment variables

Set **VITE_API_URL** to empty string so the client uses relative `/api`:

| Key           | Value |
|---------------|-------|
| VITE_API_URL  | (leave empty) |

Or explicitly: `VITE_API_URL=` (empty)

---

## 3. Backend CORS

Add your Amplify domain to `CORS_ORIGINS` in the server `.env` on EC2:

```
CORS_ORIGINS=https://main.xxxxxxxx.amplifyapp.com
```

---

## 4. Redeploy

- Save rewrites in Amplify
- Trigger a new build so `VITE_API_URL` is applied
