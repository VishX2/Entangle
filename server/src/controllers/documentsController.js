const { prisma } = require('../lib/prisma');
const config = require('../config');
const path = require('path');

/** Use request origin when behind HTTPS proxy (e.g. Cloudflare) to avoid mixed-content blocking. */
function getUploadBaseUrl(req) {
  const proto = req.get('x-forwarded-proto') || req.protocol || 'http';
  const host = req.get('x-forwarded-host') || req.get('host') || '';
  if (host && proto === 'https') {
    return `${proto}://${host}`;
  }
  return config.apiUrl;
}

async function upload(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { type, company_id } = req.body;
    const userId = req.userId || null;
    const companyId = company_id ? parseInt(company_id, 10) : null;
    const baseUrl = getUploadBaseUrl(req);
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const doc = await prisma.document.create({
      data: {
        user_id: userId,
        company_id: companyId,
        type: type || 'general',
        file_url: fileUrl,
        file_name: req.file.originalname,
      },
    });
    res.status(201).json({ id: doc.id, file_url: fileUrl, file_name: doc.file_name });
  } catch (err) {
    next(err);
  }
}

async function uploadPublic(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const baseUrl = getUploadBaseUrl(req);
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    res.status(201).json({ file_url: fileUrl, file_name: req.file.originalname });
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, uploadPublic };
