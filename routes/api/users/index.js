const { Router } = require('express');
const router = Router();
const loginRouter = require('./login');
const registerRouter = require('./register');

router.use('/login', loginRouter);
router.use('/register', registerRouter);

router.get('/', (req, res) => {
  res.send('GET /api/users');
});

module.exports = router;
