const authMiddleware = (req, res, next) => {
  if (!req.session.isLogged) {
    return res.status(401).json({
      error: 'Session expirada'
    })
  }
  next();
}

module.exports = {
  authMiddleware
}
