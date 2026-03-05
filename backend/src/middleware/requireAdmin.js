module.exports = function requireAdmin(req, res, next) {
  if (req.roleId !== 1) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
