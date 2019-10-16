const { Router } = require('express');
const router = Router();
const { User, validateEmailAndPassword } = require('../../../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('GET /api/users/login');
});

router.post('/', (req, res) => {
  // Validate the request body using Joi
  const { error } = validateEmailAndPassword(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  User.authenticate(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      return res.status(401).send('Invalid email/password combination');
    }
    // Successfully authenticated
    jwt.sign({ email: user.email }, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return res.status(401).send('Error');
      }
      res
        .header('x-auth-token', token)
        .status(200)
        .send('Successfully logged in!');
    });
  });
});

module.exports = router;
