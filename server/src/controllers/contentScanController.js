const { scan } = require('../services/piiDetection');

async function scanContent(req, res, next) {
  try {
    const { text, fields } = req.body;
    const texts = [];
    if (text) texts.push(text);
    if (Array.isArray(fields)) {
      for (const f of fields) {
        if (f && typeof f === 'string') texts.push(f);
      }
    }
    const allText = texts.join(' ');
    const result = scan(allText);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { scanContent };
