const crypto = require('crypto');

function getAuth(req, res) {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  // Keep documented fallback behavior: client uses server upload if ImageKit is not configured.
  if (!publicKey || !privateKey || !urlEndpoint) {
    return res.status(503).json({
      error: 'ImageKit is not configured',
    });
  }

  const token = crypto.randomBytes(24).toString('hex');
  const expire = Math.floor(Date.now() / 1000) + 60 * 10;
  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(`${token}${expire}`)
    .digest('hex');

  return res.json({
    token,
    expire,
    signature,
    publicKey,
    urlEndpoint,
  });
}

module.exports = { getAuth };
