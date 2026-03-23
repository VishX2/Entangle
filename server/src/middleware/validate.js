function validate(schema) {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) {
        req.body = result.data;
        return next();
      }
      const issues = result.error.issues || result.error.errors || [];
      const first = issues[0];
      const message = first ? `${first.path.join('.')}: ${first.message}` : 'Validation failed';
      return res.status(400).json({ error: message });
    } catch (err) {
      return res.status(400).json({ error: err.message || 'Validation failed' });
    }
  };
}

/** Validate req.query (e.g. GET list filters). Coerces undefined for missing keys. */
function validateQuery(schema) {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.query);
      if (result.success) {
        req.query = result.data;
        return next();
      }
      const issues = result.error.issues || result.error.errors || [];
      const first = issues[0];
      const message = first ? `${first.path.join('.')}: ${first.message}` : 'Validation failed';
      return res.status(400).json({ error: message });
    } catch (err) {
      return res.status(400).json({ error: err.message || 'Validation failed' });
    }
  };
}

module.exports = { validate, validateQuery };
