const { Router } = require('express'); // const express = require('express');
const router = Router(); // const router = express.router()
const knittersRouter = require('./knitters');
const yarnsRouter = require('./yarns');

router.use('/knitters', knittersRouter);
router.use('/yarns', yarnsRouter);

router.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

module.exports = router;
