const { Router } = require('express'); // const express = require('express');
const router = Router(); // const router = express.router()
const knittersRouter = require('./knitters');

router.use('/knitters', knittersRouter);

/* GET index page. */
router.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

module.exports = router;
