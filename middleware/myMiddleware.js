const jwt = require('jsonwebtoken');

const checkJWT = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (token) {
    // Check the validity of token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Invalid token
        return res.status(401).send('Access denied');
      } else {
        next();
      }
    });
  } else {
    // Token doesn't exist
    return res.status(401).send('Access denied');
  }
};

module.exports = { checkJWT: checkJWT };
