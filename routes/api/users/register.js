const { Router } = require('express');
const router = Router();
const { User, validateUser } = require('../../../models/user');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('GET /api/users/register');
});

router.post('/', (req, res) => {
  if (req.body.password != req.body.confirmPassword) {
    res.status(409).send('Passwords do not match');
  }
  // Validate the request body using Joi
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newUser = new User(req.body);

  // A pre-save hook is used to hash the password with bcrypt
  newUser.save((err, result) => {
    if (err) return res.status(400).send(err);
  });
  jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return res.status(401).send('Error');
    }
    return res
      .header('Access-Control-Expose-Headers', '*')
      .header('x-auth-token', token)
      .status(201)
      .json({ message: 'Successfully logged in!' });
  });
});

module.exports = router;
