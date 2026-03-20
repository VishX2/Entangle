const jwt = require('jsonwebtoken');
const config = require('../config');

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  try {
    const decoded = jwt.verify(header.slice(7), config.jwtSecret);
    req.userId = decoded.userId;
    req.roleId = decoded.roleId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next();
  try {
    const decoded = jwt.verify(header.slice(7), config.jwtSecret);
    req.userId = decoded.userId;
    req.roleId = decoded.roleId;
  } catch (_) { /* ignore */ }
  next();
}

function requireAdmin(req, res, next) {
  if (req.roleId !== 1) return res.status(403).json({ error: 'Admin access required' });
  next();
}

module.exports = { 
  auth, 
  optionalAuth, 
  requireAdmin 
};
