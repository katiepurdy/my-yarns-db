const { Router } = require('express');
const router = Router();
const { Yarn, validate } = require('../../models/yarn');
const myMiddleware = require('../../middleware/myMiddleware');

// Get all yarns
router.get('/', (req, res) => {
  Yarn.find({}, (err, yarns) => {
    if (err) return res.status(400).send('Error');
    res.status(200).send(yarns);
  });
});

// Get a yarn by ID
router.get('/:id', (req, res) => {
  Yarn.findById(req.params.id, (err, yarn) => {
    if (err || !yarn)
      return res
        .status(404)
        .send(`${yarn} A yarn with the id ${id} was not found.`);
    res.status(200).send(yarn);
  });
});

// Create a yarn
router.post('/', myMiddleware.checkJWT, (req, res) => {
  // If an ID is included, make sure it's unique before continuing
  if (req.body._id) {
    Yarn.findById({ _id: req.body._id }, err => {
      if (err) {
        return res.status(400).send(err);
      }
      res.sendStatus(422); // Unprocessable Entity when the ID is not unique
    });
  } else {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const newYarn = new Yarn(req.body);
    newYarn.save((err, result) => {
      if (err) return res.status(400).send(err);
      res.status(201).send(result);
    });
  }
});

// Update a yarn by ID
router.put('/:id', myMiddleware.checkJWT, (req, res) => {
  const id = req.params.id;
  const updatedYarn = req.body;
  const { error } = validate(updatedYarn);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  Yarn.findByIdAndUpdate(id, updatedYarn, (err, yarn) => {
    if (err || !yarn) {
      return res.status(404).send(`A yarn with the id ${id} was not found.`);
    }
    res.status(200).send(updatedYarn);
  });
});

// Delete a yarn by ID
router.delete('/:id', myMiddleware.checkJWT, (req, res) => {
  const id = req.params.id;
  Yarn.findByIdAndRemove(id, (err, yarn) => {
    if (err || !yarn)
      return res.status(404).send(`A yarn with the id ${id} was not found.`);
    res.status(204);
  });
});

module.exports = router;
