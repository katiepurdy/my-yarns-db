const { Router } = require('express');
const router = Router();
const loginRouter = require('./login');
const registerRouter = require('./register');
const { User } = require('../../../models/user');

router.use('/login', loginRouter);
router.use('/register', registerRouter);

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send('Error');
    res.status(200).send(users);
  });
});

module.exports = router;
