const { Router } = require('express');
const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.send('Welcome to the API');
  // res.render('index', {
  //   title: 'Express'
  // });
});

module.exports = router;
