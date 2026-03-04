function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || err.status || 500;
  const message = status === 500 ? 'Internal server error' : err.message;

  return res.status(status).json({ error: message });
}

module.exports = { errorHandler };
