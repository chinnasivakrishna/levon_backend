const jwt = require('jsonwebtoken');

module.exports = function(role) {
  return function(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) return res.status(401).send('Access denied');

    try {
      const decoded = jwt.verify(token, '12345');
      if (role && decoded.role !== role) {
        return res.status(403).send('Forbidden');
      }
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token');
    }
  };
};
