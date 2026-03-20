const { prisma } = require('../lib/prisma');
const path = require('path');

async function upload(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { type, company_id } = req.body;
    const userId = req.userId || null;
    const companyId = company_id ? parseInt(company_id, 10) : null;
    const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 8000}`;
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
    const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 8000}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    res.status(201).json({ file_url: fileUrl, file_name: req.file.originalname });
  } catch (err) {
    next(err);
  }
}

module.exports = { upload, uploadPublic };
