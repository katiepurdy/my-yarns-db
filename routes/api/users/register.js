const { Router } = require('express');
const router = Router();
const { User, validateUser } = require('../../../models/user');

router.get('/', (req, res) => {
  res.send('GET /api/users/register');
});

router.post('/', (req, res) => {
  // Validate the request body using Joi
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newUser = new User(req.body);
  // A pre-save hook is used to hash the password with bcrypt
  newUser.save((err, result) => {
    if (err) return res.status(400).send(err);
    res.status(201).send({ id: result._id, email: result.email });
  });
});

module.exports = router;
