const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  try {
    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.roleId = decoded.roleId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/** Sets req.userId and req.roleId when a valid token is present; does not 401 when missing. */
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next();
  try {
    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.roleId = decoded.roleId;
  } catch (_) { /* ignore */ }
  next();
}

function requireAdmin(req, res, next) {
  if (req.roleId !== 1) return res.status(403).json({ error: 'Admin access required' });
  next();
}

module.exports = { auth, optionalAuth, requireAdmin };
